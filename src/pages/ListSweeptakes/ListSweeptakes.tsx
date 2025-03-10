import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import PageContainer from "../../components/global/pageContainer/PageContainer"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { MdWorkspacePremium } from "react-icons/md";
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import { SignUpContext } from "../../contexts/SignInContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6"
import { useState, useEffect } from "react"
import { formatDate, formatHour, Sweepstake } from "../homePage/HomePage"
import { exequery, IExequery } from "../../services/api"
import { formatAmount } from "../CheckoutPage/components/SubtotalFooter"
import LoadingElement from "../../components/global/LoadingElement/LoadingElement";

export default function ListSweeptakes(){
    
    const {user} = useContext(SignUpContext)
    const navigate = useNavigate()
    const {setActiveButton} = useActiveButton()


    const [sweeptakes, setSweeptakes] = useState<ICardObjectProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const sweeptakes : ICardObjectProps[] = [
    //     {
    //         id:'1',
    //         title:'SORTEIO CAMISA OFICIAL CSA', 
    //         image: image1,
    //         date:'Domingo, 12 de Dezembro',
    //         description: `Chegou a sua chance de vestir as cores do Azulão com estilo! Participe do nosso sorteio exclusivo e leve para casa uma camisa oficial do CSA. Mostre sua paixão pelo maior de Alagoas! 
    //         Regras para Participar:
    //         Compre seu bilhete na plataforma oficial: Cada bilhete adquirido dá direito a 1 número da sorte para o sorteio. Quanto mais bilhetes, maiores as suas chances!
    //         Preencha seus dados corretamente: Certifique-se de incluir seu nome completo, telefone e e-mail no momento da compra para validar sua participação.
    //         Compartilhe e marque o CSA: Poste sobre o sorteio nos seus stories ou feed, marcando o perfil oficial do CSA no Instagram ou Facebook.
    //         Siga o CSA nas redes sociais: Confirme que você está seguindo as páginas oficiais do clube no Instagram e Facebook.
    //         Prazo e Sorteio:
    //         Último dia para participar: 11/12/2024.
    //         Data do sorteio: 12/12/2024, com transmissão ao vivo nas redes sociais oficiais do CSA.
    //         Garanta seu bilhete agora e não perca essa oportunidade! Venha torcer com a camisa que representa sua paixão pelo Azulão! Boa sorte!`,
    //         type: 'sorteio',
    //         time: '18h:00rs',
    //         price:'R$10,99'
    //     },
    //     {
    //         id:'2',
    //         title:'SORTEIO CAMISA OFICIAL CRB', 
    //         image: image2,
    //         date:'Domingo, 12 de Dezembro',
    //         description: `Chegou a sua vez de mostrar todo o seu amor pelo Galo! Participe do nosso sorteio exclusivo e tenha a chance de ganhar uma camisa oficial do CRB. Vista com orgulho as cores do maior de Alagoas!
    //         Regras para Participar:
    //         Compre seu bilhete na plataforma oficial: Cada bilhete adquirido dá direito a 1 número da sorte. Quanto mais bilhetes você comprar, maiores serão suas chances de ganhar!
    //         Preencha seus dados corretamente: Informe seu nome completo, telefone e e-mail no momento da compra para validar sua participação.
    //         Compartilhe e marque o CRB: Poste sobre o sorteio nas suas redes sociais, marcando o perfil oficial do CRB no Instagram ou Facebook.
    //         Siga o CRB nas redes sociais: Certifique-se de seguir as páginas oficiais do clube no Instagram e Facebook.
    //         Prazo e Sorteio:
    //         Último dia para participar: 11/12/2024.
    //         Data do sorteio: 12/12/2024, com transmissão ao vivo nas redes sociais oficiais do CRB.
    //         Garanta seu bilhete agora e participe! Não perca a chance de levar pra casa a camisa oficial que é símbolo da sua paixão pelo Galo! Boa sorte!`,
    //         type: 'sorteio',
    //         time: '18h:00rs',
    //         price:'R$10,99'
    //     },
    //     {
    //         id:'3',
    //         title:'SORTEIO ENGRADADO SKOL LONG NECK', 
    //         image: image3,
    //         date:'Domingo, 12 de Dezembro',
    //         description: `A festa já está garantida! Participe do nosso sorteio e tenha a chance de levar para casa um engradado de Skol Long Neck. Refresque seus momentos com a cerveja que desce redondo e é a cara da diversão!
    //         Regras para Participar:
    //         Compre seu bilhete na plataforma oficial: Cada bilhete adquirido dá direito a 1 número da sorte para o sorteio. Quanto mais bilhetes, maiores as chances de ganhar!
    //         Preencha seus dados corretamente: Informe seu nome completo, telefone e e-mail no momento da compra para validar sua participação.
    //         Siga nossas redes sociais: Certifique-se de seguir nossos perfis no Instagram e Facebook para não perder nenhuma novidade.
    //         Compartilhe o sorteio: Poste nos seus stories ou feed sobre o sorteio e marque nosso perfil oficial para validar sua participação.
    //         Prazo e Sorteio:
    //         Último dia para participar: 11/12/2024.
    //         Data do sorteio: 12/12/2024, com anúncio ao vivo nas nossas redes sociais.
    //         Garanta seu bilhete agora e prepare-se para comemorar! Não perca essa chance de ganhar um engradado de Skol Long Neck para brindar com os amigos. Boa sorte!`,
    //         type: 'sorteio',
    //         time: '18h:00rs',
    //         price:'R$10,99'
    //     },

    // ]

    async function getSweeptakes () {
        try {
            const request : IExequery = {
                method: 'get',
                route: '/raffles',
                isPublic: true,
                token: ''
            }
            const data = await exequery(request) 
            console.log(data)
            const updatedSweeptakes = [...sweeptakes]
            data.forEach((item: Sweepstake) => {
                const sweeptake : ICardObjectProps = {
                    id: item.id.toLocaleString(),
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    type:'sorteio',
                    date: formatDate(item.draw_date.split(' ')[0]),
                    time: formatHour(item.draw_date.split(' ')[1]),
                    price: `R$ ${formatAmount(parseFloat(item.value))}`,
                }
                updatedSweeptakes.push(sweeptake)
            })
            setSweeptakes(updatedSweeptakes)

        } catch (error) {
            window.alert(error)
            throw error
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true)
            try {
                await getSweeptakes()
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }

        fetchData()
        
    }, [])

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <MdWorkspacePremium/> ,
            label:'Meus Bilhetes',
            path: '/Raffles',
            onClick: () => {
                if(!user){
                    navigate('/SignIn')
                    return
                }
 
                navigate('/Raffles')
                setActiveButton('Sorteios')
            }
        },
    ]

    const buttons2 : IFloatingButtonProps[] = [
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
            <LoadingElement isLoading={isLoading}>
                <FloatingMenu items={buttons2}/>
                <FloatingMenu items={buttons}/>
                <DynamicList 
                label="Sorteios" 
                list={sweeptakes}/>
            </LoadingElement>
        </PageContainer>
    )
    
}