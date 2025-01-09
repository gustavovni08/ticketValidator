import PageContainer from "../../components/global/pageContainer/PageContainer"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import image1 from "../../assets/CSA.webp"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import { FaArrowLeft } from "react-icons/fa";
import { useContext, useEffect, useState } from "react"
import { exequery, IExequery } from "../../services/api"
import { SignUpContext } from "../../contexts/SignInContext"
import { useNavigate } from "react-router-dom"

export default function ListRaffles(){

    const {token, user} = useContext(SignUpContext)
    const {setActiveButton} = useActiveButton()
    const [raffles, setRaffles] = useState([])
    const navigate = useNavigate()

    async function getRaffles(){
        try {
            const query : IExequery = {
                isPublic: false,
                method: 'get',
                route:'/raffles/purchased',
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

        const fecthData = async () => {
            await getRaffles()
        }

        fecthData()
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



    return(
        <PageContainer>
            <FloatingMenu items={buttons}/>
            <DynamicList
            label="Meus Bilhetes"
            list={raffles.slice().reverse()}/>
        </PageContainer>
    )
}

