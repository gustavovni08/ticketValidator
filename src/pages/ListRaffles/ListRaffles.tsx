import PageContainer from "../../components/global/pageContainer/PageContainer"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import image1 from "../../assets/CSA.webp"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import { FaArrowLeft } from "react-icons/fa";

export default function ListRaffles(){

    const {setActiveButton} = useActiveButton()

    const events : ICardObjectProps[] = [
        {
            title:'SORTEIO CAMISA OFICIAL CSA', 
            image: image1,
            date:'12/12',
            description: `Chegou a sua chance de vestir as cores do Azulão com estilo! Participe do nosso sorteio exclusivo e leve para casa uma camisa oficial do CSA. Mostre sua paixão pelo maior de Alagoas! 
            Regras para Participar:
            Compre seu bilhete na plataforma oficial: Cada bilhete adquirido dá direito a 1 número da sorte para o sorteio. Quanto mais bilhetes, maiores as suas chances!
            Preencha seus dados corretamente: Certifique-se de incluir seu nome completo, telefone e e-mail no momento da compra para validar sua participação.
            Compartilhe e marque o CSA: Poste sobre o sorteio nos seus stories ou feed, marcando o perfil oficial do CSA no Instagram ou Facebook.
            Siga o CSA nas redes sociais: Confirme que você está seguindo as páginas oficiais do clube no Instagram e Facebook.
            Prazo e Sorteio:
            Último dia para participar: 11/12/2024.
            Data do sorteio: 12/12/2024, com transmissão ao vivo nas redes sociais oficiais do CSA.
            Garanta seu bilhete agora e não perca essa oportunidade! Venha torcer com a camisa que representa sua paixão pelo Azulão! Boa sorte!`,
            obj_type: 'sorteio'
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
            label="Meus Bilhetes"
            list={events}/>
        </PageContainer>
    )
}