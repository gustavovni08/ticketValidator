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
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"

export default function HomePage(){

    const {setActiveButton} = useActiveButton()

    const events : ICardObjectProps[] = [
        {
            title:'CSA X CRB FINAL CAMPEONATO ALAGOANO', 
            image: 'https://pbs.twimg.com/media/Eer4UbIXoAcQ4Nu?format=jpg&name=large',
            location: 'Estádio Rei Pelé',
            date:'12/12',
            description: 'É chegada a hora de decidir quem será o grande campeão alagoano! Não perca a chance de testemunhar um dos maiores clássicos do futebol estadual: CSA vs CRB. A rivalidade mais eletrizante de Alagoas entra em campo com toda a sua paixão, história e emoção, e você não pode ficar de fora!',
            obj_type: 'evento',
            time: '18hrs',
            price:'R$10,99'    
        },
        {
            title:'VASCO X FLAMENGO FINAL CAMPEONATO CARIOCA', 
            image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/09/14/375334154-site-tempo-real-1-1.png',
            location: 'MARACANÃ',
            date:'12/12',
            description: 'A emoção está garantida no jogo mais aguardado do ano! Vasco da Gama e Flamengo se enfrentam na grande final do Campeonato Carioca 2024. O Clássico dos Milhões, recheado de história, rivalidade e paixão, promete um espetáculo inesquecível dentro e fora de campo.',
            obj_type: 'evento',
            time: '18hrs',
            price:'R$10,99'
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
            obj_type: 'evento',
            time: '18hrs',
            price:'R$10,99'
        },
        {
            title:'CORINTHIANS X SÃO PAULO FINAL CAMPEONATO PAULISTA', 
            image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/07/25/1324107904-whatsapp-image-2023-07-24-at-131306.jpeg',
            location: 'Estádio Cícero Pompeu de Toledo',
            date:'12/12',
            description: 'O momento mais aguardado pelos torcedores paulistas está chegando! Corinthians e São Paulo se enfrentam na grande final do Campeonato Paulista 2024. Dois gigantes do futebol brasileiro em um duelo de tirar o fôlego, com a taça mais tradicional do estado em jogo.',
            obj_type: 'evento',
            time: '18hrs',
            price:'R$10,99'
        },
    ]
    
    const sweeptakes : ICardObjectProps[] = [
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
            obj_type: 'sorteio',
            time: '18hrs',
            price:'R$10,99'
        },
        {
            title:'SORTEIO CAMISA OFICIAL CRB', 
            image: image2,
            date:'12/12',
            description: `Chegou a sua vez de mostrar todo o seu amor pelo Galo! Participe do nosso sorteio exclusivo e tenha a chance de ganhar uma camisa oficial do CRB. Vista com orgulho as cores do maior de Alagoas!
            Regras para Participar:
            Compre seu bilhete na plataforma oficial: Cada bilhete adquirido dá direito a 1 número da sorte. Quanto mais bilhetes você comprar, maiores serão suas chances de ganhar!
            Preencha seus dados corretamente: Informe seu nome completo, telefone e e-mail no momento da compra para validar sua participação.
            Compartilhe e marque o CRB: Poste sobre o sorteio nas suas redes sociais, marcando o perfil oficial do CRB no Instagram ou Facebook.
            Siga o CRB nas redes sociais: Certifique-se de seguir as páginas oficiais do clube no Instagram e Facebook.
            Prazo e Sorteio:
            Último dia para participar: 11/12/2024.
            Data do sorteio: 12/12/2024, com transmissão ao vivo nas redes sociais oficiais do CRB.
            Garanta seu bilhete agora e participe! Não perca a chance de levar pra casa a camisa oficial que é símbolo da sua paixão pelo Galo! Boa sorte!`,
            obj_type: 'sorteio',
            time: '18hrs',
            price:'R$10,99'
        },
        {
            title:'SORTEIO ENGRADADO SKOL LONG NECK', 
            image: image3,
            date:'11/12',
            description: `A festa já está garantida! Participe do nosso sorteio e tenha a chance de levar para casa um engradado de Skol Long Neck. Refresque seus momentos com a cerveja que desce redondo e é a cara da diversão!
            Regras para Participar:
            Compre seu bilhete na plataforma oficial: Cada bilhete adquirido dá direito a 1 número da sorte para o sorteio. Quanto mais bilhetes, maiores as chances de ganhar!
            Preencha seus dados corretamente: Informe seu nome completo, telefone e e-mail no momento da compra para validar sua participação.
            Siga nossas redes sociais: Certifique-se de seguir nossos perfis no Instagram e Facebook para não perder nenhuma novidade.
            Compartilhe o sorteio: Poste nos seus stories ou feed sobre o sorteio e marque nosso perfil oficial para validar sua participação.
            Prazo e Sorteio:
            Último dia para participar: 11/12/2024.
            Data do sorteio: 12/12/2024, com anúncio ao vivo nas nossas redes sociais.
            Garanta seu bilhete agora e prepare-se para comemorar! Não perca essa chance de ganhar um engradado de Skol Long Neck para brindar com os amigos. Boa sorte!`,
            obj_type: 'sorteio',
            time: '18hrs',
            price:'R$10,99'
        },

    ]

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaTicketAlt/>,
            label:'Meus Ingressos',
            path: '/Tickets',
            onClick: () => {setActiveButton('Eventos')}
        },
        {
            icon: <MdWorkspacePremium/> ,
            label:'Meus Bilhetes',
            path:'/Raffles',
            onClick: () => {setActiveButton('Sorteios')}
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