import image1 from "../../assets/CSA.webp"
import image2 from "../../assets/CRB.webp"
import image3 from "../../assets/CERVEJA.webp"
import { useNavigate, useParams } from "react-router-dom"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import ProductUnitController from "./components/ProductUnitController"
import SubtotalFooter from "./components/SubtotalFooter"
import { motion } from 'framer-motion'
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { FaArrowLeft } from "react-icons/fa6"
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { useContext, useEffect, useState } from "react"
import { exequery, IExequery } from "../../services/api"
import { SignUpContext } from "../../contexts/SignInContext"
import LoadingElement from "../../components/global/LoadingElement/LoadingElement"


export interface ITicketType{
    ticketTypeID: string,
    ticketTypeName: string,
    eventID: string,
    price: number
    qtdAvailable: number
}

export interface ITicketTypeResponse {
    id: number
    event_id: number
    type: string
    price: string
    quantity: number
    created_at: string
    updated_at: string
  }

export interface IEventResponse {

    id: number
    title: string
    description: string
    image: string
    event_date: string
    location: string
    price: string
    available_tickets: number
    regulations: string
    created_at: string
    updated_at: string
    ticket_types: ITicketTypeResponse[]

}

export interface ISweeptakeResponse {
    
    id: number
    title: string
    image: string
    description: string
    draw_date: string
    value: string
    status: number
    billet_quantity: number
    rules: string | null
    created_at: string
    updated_at: string

}

export default function CheckOutPagePage(){

    const {productID, productType} = useParams()
    const {token, user} = useContext(SignUpContext)
    const {setActiveButton} = useActiveButton()
    const navigate = useNavigate()
    const [product, setProduct] = useState<ICardObjectProps>()
    const [ticketsTypes, setTicketsTypes] = useState<ITicketType[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function getProduct(){
        try {
            setIsLoading(true)
            if(productType === 'evento'){
                const query : IExequery = {
                    isPublic: false,
                    method:'get',
                    route:`/events/${productID}`,
                    token: token
                }

                const data : IEventResponse = await exequery(query)
                
                const ticketsTypes : ITicketType[] = []
                data.ticket_types.forEach((item: ITicketTypeResponse) => {
                    const ticketType: ITicketType = {
                        eventID: data.id.toLocaleString(),
                        price: parseFloat(item.price),
                        qtdAvailable: item.quantity,
                        ticketTypeID: item.id.toLocaleString(),
                        ticketTypeName: item.type
                    }
                    ticketsTypes.push(ticketType)
                })

                setTicketsTypes(ticketsTypes)
                
                const product : ICardObjectProps = {
                    id: data.id.toLocaleString(),
                    title:data.title,
                    description: data.description,
                    image: data.image,
                    type: 'evento',
                }

                setProduct(product)
                console.log(data)

            }

            if(productType === 'sorteio'){
                
                const query : IExequery = {
                    isPublic: false,
                    method:'get',
                    route:`/raffles/${productID}`,
                    token: token
                }

                const data : ISweeptakeResponse = await exequery(query)
                console.log(data)

                const product : ICardObjectProps = {
                    id: data.id.toLocaleString(),
                    title: data.title,
                    image: data.image,
                    description: data.description,
                    type:'sorteio',
                    price: data.value,
                    qtd: data.billet_quantity
                }
                
                setProduct(product)

            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(!user){
            navigate('/')
        }
        const fetchData = async () => {
            await getProduct()
        }
        fetchData()
    }, [])

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {setActiveButton('Home')},
            row: true,
        },
    ] 

    console.log(productID, productType)
    return(
        <div className="flex flex-col space-y-2">
            <div className="w-full flex justify-between border-b p-2 fixed bg-white shadow-sm">
                <div className="font-[600]">
                    Checkout
                </div>
                <div className="font-[600]">
                    Ingresos PacSafe
                </div>
            </div>
            <LoadingElement isLoading={isLoading}>
            {productID && (
                <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="w-full max-h-[100vh] pb-48 overflow-y-scroll items-center flex flex-col pt-10">
                    {product && (
                        <div className="w-[90%] flex flex-col items-center justify-center space-y-4">
                            <FloatingMenu items={buttons}/>
                            <div className="font-[600] text-lg">
                                {product.title}
                            </div>
                            <div>
                                <img src={product.image} alt="" className="rounded-md shadow-md"/>
                            </div>
                            <div className="p-1 h-[20vh] overflow-y-scroll border-y">
                                {product.description}
                            </div>
                        </div>
                    )}
                    {productType === 'sorteio' && (
                        <div className="w-full">
                            <ProductUnitController 
                            eventID={productID}
                            price={parseFloat(product?.price || '2.99')}
                            ticketTypeID="1"
                            ticketTypeName={product?.title || 'BILHETE'}
                            qtdAvailable={product?.qtd || 99999}
                            />
                        </div>
                    )}
                    {productType === 'evento' && ticketsTypes && (
                        <>
                            {ticketsTypes.map((item, index) => {
                                return(
                            
                                    <ProductUnitController 
                                    key={index}
                                    eventID={productID}
                                    price={item.price}
                                    ticketTypeID={item.ticketTypeID}
                                    ticketTypeName={item.ticketTypeName}
                                    qtdAvailable={item.qtdAvailable}
                                    />
                                    
                                )
                            })}
                        </>
                    )}
                </motion.div>
            )}
            </LoadingElement>
            <SubtotalFooter
            object={product || {description:'', id:'', image:'', title:'', type:'evento'}}
            />
        </div>
 
    )
}
