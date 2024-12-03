import PageContainer from "../../components/global/pageContainer/PageContainer"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { FaArrowLeft } from "react-icons/fa6"

export default function ListTickets(){


    const {setActiveButton} = useActiveButton()

    const events : ICardObjectProps[] = [
        {
            title:'CSA X CRB FINAL CAMPEONATO ALAGOANO', 
            image: 'https://pbs.twimg.com/media/Eer4UbIXoAcQ4Nu?format=jpg&name=large',
            location: 'Estádio Rei Pelé',
            date:'12/12',
            description: 'É chegada a hora de decidir quem será o grande campeão alagoano! Não perca a chance de testemunhar um dos maiores clássicos do futebol estadual: CSA vs CRB. A rivalidade mais eletrizante de Alagoas entra em campo com toda a sua paixão, história e emoção, e você não pode ficar de fora!',
            obj_type: 'evento'    
        },
        {
            title:'VASCO X FLAMENGO FINAL CAMPEONATO CARIOCA', 
            image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/09/14/375334154-site-tempo-real-1-1.png',
            location: 'MARACANÃ',
            date:'12/12',
            description: 'A emoção está garantida no jogo mais aguardado do ano! Vasco da Gama e Flamengo se enfrentam na grande final do Campeonato Carioca 2024. O Clássico dos Milhões, recheado de história, rivalidade e paixão, promete um espetáculo inesquecível dentro e fora de campo.',
            obj_type: 'evento'
        },
        {
            title:'ASA X CSE FINAL CAMPEONATO ALAGOANO SUB-16', 
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcIpkx4u8lZUhyZWek1-odJUbLNVvZg4fuAw&s',
            location: 'Estádio Rei Pelé',
            date:'11/12',
            description: `O futuro do futebol alagoano brilha na decisão do Campeonato Alagoano Sub-16! CSE e ASA entram em campo para disputar a tão sonhada taça, prometendo uma final repleta de talento, raça e paixão.
            Data: 12/12/2024
            Local: [Insira o estádio e cidade]
            Horário: [Insira o horário do jogo]
            Essa é a oportunidade de acompanhar de perto os craques que representam o futuro do nosso futebol. Cada lance será decisivo, e as torcidas de Palmeira dos Índios e Arapiraca vão fazer a festa nas arquibancadas.
            Garanta já o seu ingresso!
            Acesse nossa plataforma oficial e compre seu bilhete.
            Os ingressos são limitados, então não perca tempo!
            Venha torcer e viver a emoção do futebol alagoano! CSE vs ASA na grande final Sub-16: uma partida que promete entrar para a história!`,
            obj_type: 'evento'
        },
    ]

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
            label="Meus Ingressos"
            list={events}/>
        </PageContainer>
    )
}

