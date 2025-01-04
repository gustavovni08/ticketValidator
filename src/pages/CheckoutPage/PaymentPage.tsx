import { useCallback, useContext, useEffect, useState } from "react"
import { CheckoutContext } from "./context/CheckoutContext"
import { formatAmount } from "./components/SubtotalFooter"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ConfirmModal from "../../components/modal/ConfirmModal/ConfirmModal"
import { motion } from "framer-motion"
import { FaArrowLeft } from "react-icons/fa6"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"

export default function PaymentPage(){

    const {amount, items, object, order} = useContext(CheckoutContext)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [timeLeft, setTimeLeft] = useState<number>(300)
    const [getTimer, setGetTimer] = useState(5)
    const [status, setStatus] = useState()
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const navigate = useNavigate()
    const {setActiveButton} = useActiveButton()
    console.log(object)
    console.log(order)

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            onClick: () =>{
                navigate(-1)
            },
            row: true,
        },
    ] 

    const getOrderData = useCallback(async () => {
        try {
          const {data} = await axios.get(`https://api-totem.pacsafe.com.br/api/checkout/${order?.charge.id}`)
          setStatus(data.order.status)
        } catch (error) {
          console.error(error)
        }
    }, [order?.charge.id])
    
    function formatTime (seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const generateQRCode = useCallback(() => {
        if (order?.charge.chave_pix) {
          const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(order?.charge.chave_pix)}`
          setQrCodeUrl(url)
        }
    }, [order?.charge.chave_pix])

    
    useEffect(() => {
        generateQRCode()
    }, [generateQRCode])
    useEffect(() => {
        if (getTimer > 0) {
            const intervalId = setInterval(() => {
                setGetTimer((prev) => prev - 1);
            }, 1000);
    
            return () => clearInterval(intervalId);
        }
    
        if (getTimer === 0) {
            getOrderData()
            setGetTimer(5)
        }
    }, [getTimer, getOrderData]);

    useEffect(() => {
        if(status === 'concluido'){
            setShowConfirmModal(true)
        }
    }, [status, navigate])


    useEffect(() => {
       
        if(timeLeft > 0){
            const intervalID = setInterval(() =>{ 
                setTimeLeft((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(intervalID)
        }

        if(timeLeft === 0){
            navigate(-1)
        }
    }, [timeLeft])

    return(
        <>
            <ConfirmModal 
            isOpen={showConfirmModal}
            closeModal={() => {
                setShowConfirmModal(false)
            }}
            title="PAGAMENTO CONFIRMADO"
            message="Retorne ao app e confira seus Ingressos"
            type="confirm"
            textButton={`
                ${object?.type === 'sorteio' ? 'Ver Bilhetes' : ''} 
                ${object?.type === 'evento' ? 'Ver Ingressos' : ''}
            `}
            onConfirm={() => {
                
                if(object?.type === 'sorteio'){
                    navigate('/Raffles')
                    return
                }

                if(object?.type === 'evento') {
                    navigate('/Tickets')
                    return
                }

            }}
            />
            <div className="flex flex-col space-y-2">
                <div className="w-full flex justify-between border-b p-2 fixed bg-white shadow-sm">
                    <div className="font-[600]">
                        Checkout
                    </div>
                    <div className="font-[600]">
                        Ingresos PacSafe
                    </div>
                </div>
                <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="w-full min-h-[100vh] pb-48 overflow-y-scroll items-center flex flex-col pt-10">
                    <div className="w-[90%] flex flex-col items-center justify-center space-y-4">
                        <FloatingMenu items={buttons}/>
                        <div className="font-[600] text-lg" >
                            {object?.title}
                        </div>
                        <div className="h-40 overflow-hidden w-full">
                            <img src={object?.image} alt="" className="rounded-md h-full w-full shadow-md object-cover"/>
                        </div>
                        <div className="flex flex-col w-[97%]">
                            {
                                [
                                    {label: 'Número da Compra:', value: order?.charge.id},
                                    {label: 'Valor da Compra:', value: `R$ ${formatAmount(parseFloat(order?.charge.total_price || '0'))}`},
                                    {label: 'Forma de Pagamento:', value: order?.charge.payment_method},
                                    {label: 'A Compra expira em:', value: formatTime(timeLeft)},
                                ].map((item) => {
                                    return(
                                        <div className="flex w-full justify-between py-2 border-t text-sm">
                                            <div className="font-[600]">
                                                {item.label}
                                            </div>
                                            <div className="font-[600]">
                                                {item.value}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <img src={qrCodeUrl} alt="qrCode" className="rounded-md"/>
                        </div>
                        <div 
                        onClick={() => {navigator.clipboard.writeText(order?.charge.chave_pix || '')}}
                        className="flex w-full border p-2 shadow-md rounded-full hover:brightness-90 hover:scale-95 transition-transform duration-300 cursor-pointer">
                            <div className="truncate text-sm">{order?.charge.chave_pix}</div>
                            <div className="text-sm font-[600] border-l pl-2">Copiar</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>

    )
}