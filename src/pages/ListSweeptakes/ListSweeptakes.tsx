import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import PageContainer from "../../components/global/pageContainer/PageContainer"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import image1 from "../../assets/CSA.webp"
import image2 from "../../assets/CRB.webp"
import image3 from "../../assets/CERVEJA.webp"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { MdWorkspacePremium } from "react-icons/md";

export default function ListSweeptakes(){

    
    const sweeptakes : ICardObjectProps[] = [
        {
            title:'CSA X CRB FINAL CAMPEONATO ALAGOANO', 
            image: image1,
            date:'12/12'
        },
        {
            title:'VASCO X FLAMENGO FINAL CAMPEONATO CARIOCA', 
            image: image2,
            date:'12/12'
        },
        {
            title:'ASA X CSE FINAL CAMPEONATO ALAGOANO SUB-16', 
            image: image3,
            date:'11/12'
        },

    ]

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <MdWorkspacePremium/> ,
            label:'Meus Bilhetes',
            path: '/Raffles'
        },
    ]
    
    return(
        <PageContainer>
            <FloatingMenu items={buttons}/>
            <DynamicList 
            label="Sorteios" 
            list={sweeptakes}/>
        </PageContainer>
    )
    
}