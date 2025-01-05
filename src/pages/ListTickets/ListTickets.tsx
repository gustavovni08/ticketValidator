import PageContainer from "../../components/global/pageContainer/PageContainer"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { FaArrowLeft } from "react-icons/fa6"
import LoadingElement from "../../components/global/LoadingElement/LoadingElement"
import { useContext, useEffect, useState } from "react"
import { exequery, IExequery } from "../../services/api"
import { SignUpContext } from "../../contexts/SignInContext"
import { useNavigate } from "react-router-dom"
import { IEventResponse, ITicketTypeResponse } from "../CheckoutPage/CheckoutPage"
import { formatDate, formatHour } from "../homePage/HomePage"

export interface ITicketResponse {
    id: number;
    charge_id: number;
    ticket_number: string;
    status: string; 
    ticket_type_id: number;
    price: string;
    quantity: number;
    user_id: number;
    event_id: number;
    is_used: boolean; 
    qr_code_base64: string;
    created_at: string;
    updated_at: string;
    event: IEventResponse;
    ticket_type: ITicketTypeResponse;
  }

export default function ListTickets(){

    const {token, user} = useContext(SignUpContext)
    const {setActiveButton} = useActiveButton()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const [tickets, setTickets] = useState<ICardObjectProps[]>([])

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {setActiveButton('Home')},
            row: true,
        },
    ] 

    async function getTickets() {
        try {
            const query : IExequery = {
                isPublic: false,
                method: 'get',
                route:`/tickets`,
                token: token
            }

            const data : ITicketResponse[] = await exequery(query)
            const tickets : ICardObjectProps[] = []
            console.log(data)
            data.forEach((item: ITicketResponse) => {
                const ticket : ICardObjectProps = {
                    id: item.id.toLocaleString(),
                    title: item.ticket_type.type,
                    description: item.event.description,
                    image: item.event.image,
                    date: formatDate(item.event.event_date.split(' ')[0]),
                    time: formatHour(item.event.event_date.split(' ')[1]),
                    type:'ingresso',
                    qrcode: item.ticket_number,
                } 
                tickets.push(ticket)
            })
            return tickets
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {

        if(!user){
            navigate('/SignIn')
        }
        
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const tickets = await getTickets()
                setTickets(tickets!)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()

    }, [])


    return(
        <PageContainer>
            <LoadingElement isLoading={isLoading}>
                <FloatingMenu items={buttons}/>
                <DynamicList
                label="Meus Ingressos"
                list={tickets}/>
            </LoadingElement>
        </PageContainer>
    )
}

