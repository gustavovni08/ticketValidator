import PageContainer from "../../components/global/pageContainer/PageContainer"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import image1 from "../../assets/CSA.webp"

export default function ListRaffles(){


    const events : ICardObjectProps[] = [
        {
            title:'CSA X CRB FINAL CAMPEONATO ALAGOANO', 
            image: image1,
            date:'12/12'
        },
    ]



    return(
        <PageContainer>
            <DynamicList
            label="Meus Bilhetes"
            list={events}/>
        </PageContainer>
    )
}