import { FaArrowLeft } from "react-icons/fa"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import PageContainer from "../../components/global/pageContainer/PageContainer"
import { useLocation, useNavigate } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { useContext, useEffect, useState } from "react"
import { SignUpContext } from "../../contexts/SignInContext"
import TicketModal from "../../components/modal/ticketModal/TicketModal"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import RaffleModal from "../../components/modal/raffleModal/RaffleModal"
import { exequery, IExequery } from "../../services/api"
import { ITicketResponse } from "../ListTickets/ListTickets"
import ConfirmModal, { IConfirmModalProps } from "../../components/modal/ConfirmModal/ConfirmModal"
import { IEventResponse } from "../CheckoutPage/CheckoutPage"
import { log } from "node:console"
import LoadingElement from "../../components/global/LoadingElement/LoadingElement"

export interface IDetailsPageProps {
    id: number
    type: 'ingresso' | 'bilhete' | 'evento' | 'sorteio'
    title: string
    description: string
    image: string
    date?: string
    location?: string
    time?:string
    price?: string
    qrcode?:string
}

export default function DetailsPage(){

    const location = useLocation()
    const state = location.state as ICardObjectProps;
    const { id, type, title, description, image, date, location: loc, time, price, qrcode, result } = state;
    const [showTicketModal, setShowTicketModal] = useState<boolean>(false)
    const [showRaffleModal, setShowRaffleModal] = useState<boolean>(false)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
    const [confirmModalProps, setConfirmModalProps] = useState<IConfirmModalProps>({closeModal: () => {}, isOpen: false, title: '', type:'confirm', auxFunction: () => {}, message:'', onConfirm: () => {}, textButton: ''})
    const [tickets, setTickets] = useState([])
    const {user, token} = useContext(SignUpContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    function typeFunctionController(){
        if(type === 'evento'){
            if(!user){
                navigate('/signIn')
                return
            }

            const validation = validateTicket()
            console.log(validation)
            if(!validation) navigate(`/Checkout/${1}/${type}/${id}`);
        }
        if(type === 'sorteio'){
            if(!user){
                navigate('/signIn')
                return
            }
            navigate(`/Checkout/${1}/${type}/${id}`)
        }
        if( type === 'ingresso'){
            setShowTicketModal(true)
        }
        if( type === 'bilhete' && result){
            setShowRaffleModal(true)
        }
    }

    async function getTickets(){
        if(type === 'evento'){
            try {
                
                const query : IExequery = {
                    isPublic: false,
                    method: 'get',
                    route: '/tickets',
                    token: token,
                }

                const data = await exequery(query)
                console.log(data)
                return data                
            } catch (error) {
                throw error
            }
        }
        return
    }

    function validateTicket() {
        const hasTicket = tickets.some((item: ITicketResponse) => {
            console.log('oi');
            return item.event.id === parseInt(id);
        });
    
        console.log(hasTicket);
    
        if (hasTicket) {
            const modal: IConfirmModalProps = {
                closeModal: () => setShowConfirmModal(false),
                isOpen: showConfirmModal,
                title: 'Ingresso já obtido',
                type: 'confirm',
                onConfirm: () => {
                    setShowConfirmModal(false);
                    navigate('/Tickets');
                },
                message: 'Ingresso para esse Evento já foi obtido.',
                textButton: 'Ver Ingressos',
            };
    
            setConfirmModalProps(modal);
            setShowConfirmModal(true);
            return hasTicket;
        }

        return hasTicket;
    }

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {},
            row: true,
        },
    ] 

    useEffect(() => {

        const fetchData = async () => {

            if(user && token){  
                setIsLoading(true)              
                const tickets = await getTickets()
                setTickets(tickets)
                setIsLoading(false)
            }
        
        }

        fetchData()

    }, [])

    return( 
        <>
            <ConfirmModal 
            isOpen={showConfirmModal}
            closeModal={confirmModalProps.closeModal}
            title={confirmModalProps.title}
            type={confirmModalProps.type}
            auxFunction={confirmModalProps.auxFunction}
            message={confirmModalProps.message}
            onConfirm={confirmModalProps.onConfirm}
            textButton={confirmModalProps.textButton}
            />
            
            <TicketModal 
            isOpen={showTicketModal} 
            closeModal={() => {setShowTicketModal(false)}}
            id={id}
            ticketName={title}
            qrcode={qrcode || ''}
            location={loc || ''}
            date={date || ''}
            time={time || ''}
            />
            <RaffleModal
            isOpen={showRaffleModal}
            closeModal={() => {setShowRaffleModal(false)}}
            id={id}
            result={result!}
            description={description}
            />
            <PageContainer>
            <LoadingElement isLoading={isLoading}>
            <FloatingMenu items={buttons}/>
                <div className="min-h-[100vh] w-full pb-[30%] justify-center items-center">
                    <div className="flex flex-col w-full max-h-[100%] p-4 mt-10 space-y-4 bg-white border shadow-lg rounded-md">
                    <div className="w-full tetx-lg font-[600] flex justify-center">
                        <div>
                            {title}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img src={image} alt={title} className="rounded-md"/>
                    </div>
                    <div className="py-4 border-y h-[20vh] overflow-y-scroll">
                        {description}
                    </div>
                    {type === 'bilhete' && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <FaTicketAlt />
                                </div>
                                <div>
                                    Número do Bilhete:
                                </div>
                            </div>
                            <div className="font-[500]">#{id}</div>
                        </div>
                    )}
                    {type === 'ingresso' && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <FaTicketAlt />
                                </div>
                                <div>
                                    Número do Ingresso:
                                </div>
                            </div>
                            <div className="font-[500]">#{id}</div>
                        </div>
                    )}
                    {loc && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <FaLocationDot />
                                </div>
                                <div>
                                    Local:
                                </div>
                            </div>
                            <div className="font-[500]">{loc}</div>
                        </div>
                    )}
                    {date && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <FaCalendar />
                                </div>
                                <div>
                                    Data:
                                </div>
                            </div>
                            <div className="font-[500]">{date}</div>
                        </div>
                    )}
                    {time && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <IoTime />
                                </div>
                                <div>
                                    Hora:
                                </div>
                            </div>
                            <div className="font-[500]">{time}</div>
                        </div>
                    )}
                    {price && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                <BsCash />
                                </div>
                                <div>
                                    Preço:
                                </div>
                            </div>
                            <div className="font-[500]">{price}</div>
                        </div>
                    )}

                    <div className="w-full flex items-center justify-center p-4">
                        {type !== 'bilhete' && (
                            <div 
                            onClick={typeFunctionController}
                            className="flex w-4/5 bg-black p-4 rounded-lg items-center justify-center shadow-md hover:scale-105 hover:brightness-90 cursor-pointer">
                                    {type === "evento" && (
                                        <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                            <div>
                                                <FaTicketAlt/>
                                            </div>
                                            <div>
                                                Comprar Ingresso
                                            </div>
                                        </div>
                                    )}
                                    {type === "sorteio" && (
                                        <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                            <div>
                                                <FaTicketAlt/>
                                            </div>
                                            <div>
                                                Comprar Bilhete
                                            </div>
                                        </div>
                                    )}
                                     {type === "ingresso" && (
                                        <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                            <div>
                                                <FaTicketAlt/>
                                            </div>
                                            <div>
                                                Ver ingresso
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}

                        {type === "bilhete" && (
                             <div 
                             onClick={typeFunctionController}
                             className={`flex w-4/5 ${result ? 'bg-black hover:scale-105 hover:brightness-90' : 'bg-gray-400'} p-4 rounded-lg items-center justify-center shadow-md cursor-pointer`}>
                            <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                <div>
                                    <MdWorkspacePremium/>
                                </div>
                                <div>
                                    Ver Resultado
                                </div>
                            </div>
                            </div>
                        )}

                    </div>




                    </div>

                </div>
            </LoadingElement>

            </PageContainer>
        </>
    )
}