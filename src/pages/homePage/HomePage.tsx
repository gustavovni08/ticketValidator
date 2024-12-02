import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import PageContainer from "../../components/global/pageContainer/PageContainer"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import image1 from "../../assets/CSA.webp"
import image2 from "../../assets/CRB.webp"
import image3 from "../../assets/CERVEJA.webp"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { FaTicketAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";

export default function HomePage(){


    const events : ICardObjectProps[] = [
        {
            title:'CSA X CRB FINAL CAMPEONATO ALAGOANO', 
            image: 'https://pbs.twimg.com/media/Eer4UbIXoAcQ4Nu?format=jpg&name=large',
            location: 'Estádio Rei Pelé',
            date:'12/12'
        },
        {
            title:'VASCO X FLAMENGO FINAL CAMPEONATO CARIOCA', 
            image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/09/14/375334154-site-tempo-real-1-1.png',
            location: 'MARACANÃ',
            date:'12/12'
        },
        {
            title:'ASA X CSE FINAL CAMPEONATO ALAGOANO SUB-16', 
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcIpkx4u8lZUhyZWek1-odJUbLNVvZg4fuAw&s',
            location: 'Estádio Rei Pelé',
            date:'11/12'
        },
        {
            title:'CORINTHIANS X SÃO PAULO FINAL CAMPEONATO PAULISTA', 
            image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/07/25/1324107904-whatsapp-image-2023-07-24-at-131306.jpeg',
            location: 'MorumBIS - Estádio Cícero Pompeu de Toledo',
            date:'12/12'
        },
    ]
    
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
            icon: <FaTicketAlt/>,
            label:'Meus Ingressos',
            path: '/Tickets'
        },
        {
            icon: <MdWorkspacePremium/> ,
            label:'Meus Bilhetes',
            path:'/Raffles'
        },
    ] 


    return(
        <PageContainer>
            <FloatingMenu items={buttons}/>
            <DynamicList 
            label="Eventos" 
            list={events}
            secondaryLabel="Sorteios"
            secondaryList={sweeptakes}/>
        </PageContainer>
    )
}