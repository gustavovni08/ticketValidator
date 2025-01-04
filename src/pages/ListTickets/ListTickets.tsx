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

export default function ListTickets(){


    const {token, user} = useContext(SignUpContext)
    const {setActiveButton} = useActiveButton()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const [events, setEvents] = useState([])

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

            const data = await exequery(query)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {

        if(!user){
            navigate('/SignIn')
        }
        
        const fetchData = async () => {
            await getTickets()
        }

        fetchData()

    }, [])


    return(
        <PageContainer>
            <LoadingElement isLoading={isLoading}>
                <FloatingMenu items={buttons}/>
                <DynamicList
                label="Meus Ingressos"
                list={events}/>
            </LoadingElement>
        </PageContainer>
    )
}

