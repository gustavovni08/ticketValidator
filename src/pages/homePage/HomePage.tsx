import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import DynamicList from "../../components/global/DynamicList/DynamicList"
import PageContainer from "../../components/global/pageContainer/PageContainer"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import LoadingElement from "../../components/global/LoadingElement/LoadingElement"
import banner from "../../assets/Gemini_Generated_Image_bqoxpobqoxpobqox.jpg"
import image1 from "../../assets/CSA.webp"
import image2 from "../../assets/CRB.webp"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { FaTicketAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext"
import { SignUpContext } from "../../contexts/SignInContext"
import { useContext, useEffect, useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { IoIosLogIn } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion"
import { api, exequery, IExequery } from "../../services/api"
import { formatAmount } from "../CheckoutPage/components/SubtotalFooter"



export interface Event {
    id: number;
    title: string;
    description: string;
    image: string;
    event_date: string; 
    location: string;
    price: string; 
    available_tickets: number;
    regulations: string;
    created_at: string; 
    updated_at: string; 
    event_types: any[]; 
}

export interface Sweepstake {
    id: number;
    title: string;
    image: string;
    description: string;
    draw_date: string;
    value: string;
    status: number;
    billet_quantity: number | null;
    rules: string | null;
    created_at: string;
    updated_at: string;
  }

export function formatDate(isoDate: string){
    const [year, month, day] = isoDate.split('-')
    return `${day}/${month}/${year}`
}

export function formatHour(hour: string){
    const splittedHour = hour.split(':')

    return `${splittedHour[0]}:${splittedHour[1]}Hrs`
     
}


export default function HomePage(){

    const navigate = useNavigate()
    const {setActiveButton} = useActiveButton()
    const {user, token, setUser} = useContext(SignUpContext)
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
    const [events, setEvents] = useState<ICardObjectProps[]>([])
    const [sweeptakes, setSweeptakes] = useState<ICardObjectProps[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaTicketAlt/>,
            label:'Meus Ingressos',
            onClick: () => {
                if(!user){
                    navigate('/SignIn')
                    return
                }

                navigate('/Tickets')
                setActiveButton('Eventos')}
        },
        {
            icon: <MdWorkspacePremium/> ,
            label:'Meus Bilhetes',
            onClick: () => {
                
                if(!user){
                    navigate('SignIn')
                    return
                }

                navigate('/Raffles')
                setActiveButton('Sorteios')
            }
        },
        {
            icon: <FaTicketAlt/>,
            label:'Comprar Ingresso',
            onClick: () => {
                navigate('Events')
                setActiveButton('Eventos')}
        },
        {
            icon: <MdWorkspacePremium/> ,
            label:'Comprar Bilhetes',
            onClick: () => {
                navigate('/Sweeptakes')
            }
        },
        {
            icon: <IoIosLogIn /> ,
            label:!user ? 'Entrar' : 'Sair',
            onClick: () => {
                if(!user){
                    navigate('/SignIn')
                    return
                }
                if(user){
                    setUser(null)
                    navigate('/')
                }
            }
        },
    ] 

    const banners = [
        {img: banner},
        {img: image1},
        {img: image2},
    ]

    function fowardBanner(){
        setCurrentBannerIndex((prevIndex) =>
            prevIndex === banners.length - 1 ? 0 : prevIndex + 1
          )
    }

    async function getEvents() {
        try {
            const request : IExequery = {
                method: 'get',
                route: '/events',
                isPublic: true,
                token: ''
            }
            const data = await exequery(request) 
            console.log(data)
            const updatedEvents = [...events]
            data.forEach((item: Event ) => {
                const iteredEvent : ICardObjectProps = {
                    id: item.id.toLocaleString(),
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    type: 'evento',
                    date: formatDate(item.event_date.split(' ')[0]),
                    time: formatHour(item.event_date.split(' ')[1]),
                    location: item.location,
                }
                updatedEvents.push(iteredEvent)
            })
            setEvents(updatedEvents)


        } catch (error) {
            window.alert(error)
            console.log(error)
            throw error
        }
    }

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
            if(data){
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
            }

        } catch (error) {
            window.alert(error)
            throw error
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true)
            try {
                await getEvents()
                await getSweeptakes()
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }

        fetchData()
        
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            fowardBanner()
        }, 5000);
    
        return () => clearInterval(interval)
    }, [banners.length]);

    return (
        <PageContainer>
            <LoadingElement isLoading={isLoading}>
            <>
                    <AnimatePresence mode="wait">
                        <div className="w-full flex pt-10 snap-x space-x-4 snap-mandatory">
                            <div
                                onClick={fowardBanner}
                                className="w-full h-[20vh] rounded-md relative flex-shrink-0 snap-start"
                            >
                                <motion.img
                                    key={currentBannerIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    src={banners[currentBannerIndex].img}
                                    alt=""
                                    className="object-cover w-full h-full rounded-md hover:scale-y-105 hover:brightness-90 cursor-pointer"
                                />
                            </div>
                        </div>
                    </AnimatePresence>
                    <FloatingMenu items={buttons} />
                    <DynamicList
                        label="Próximos Jogos"
                        list={events}
                        secondaryLabel="Concorra Agora!"
                        secondaryList={sweeptakes}
                    />
                </>
            </LoadingElement>
        </PageContainer>
    );
    
}
