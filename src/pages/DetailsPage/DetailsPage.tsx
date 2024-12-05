import { FaArrowLeft } from "react-icons/fa"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import PageContainer from "../../components/global/pageContainer/PageContainer"
import { useLocation, useNavigate } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { useContext, useEffect, useState } from "react"
import { SignUpContext } from "../../contexts/SignInContext"
import TicketModal from "../../components/modal/ticketModal/TicketModal"
import { ICardObjectProps } from "../../components/global/cardObject/CardObject"
import RaffleModal from "../../components/modal/raffleModal/RaffleModal"

export interface IDetailsPageProps {
    id: number
    type: 'ingresso' | 'bilhete' | 'evento' | 'sorteio'
    title: string
    description: string
    image: string
    date?: string
    location?: string
    time?:string
    price?: string
    qrcode?:string
}

export default function DetailsPage(){

    const location = useLocation()
    const state = location.state as ICardObjectProps;
    const { id, type, title, description, image, date, location: loc, time, price, qrcode } = state;
    const [showTicketModal, setShowTicketModal] = useState<boolean>(false)
    const [showRaffleModal, setShowRaffleModal] = useState<boolean>(false)
    const {user} = useContext(SignUpContext)
    const navigate = useNavigate()

    function typeFunctionController(){
        if(type === 'evento'){
            if(!user){
                navigate('/signIn')
                return
            }
        }
        if(type === 'sorteio'){
            if(!user){
                navigate('/signIn')
                return
            }
        }
        if( type === 'ingresso'){
            setShowTicketModal(true)
        }
        if( type === 'bilhete'){
            setShowRaffleModal(true)
        }
    }

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {},
            row: true,
        },
    ] 

    return( 
        <>
            <TicketModal 
            isOpen={showTicketModal} 
            closeModal={() => {setShowTicketModal(false)}}
            id={id}
            ticketName={title}
            qrcode={qrcode || ''}
            location={loc || ''}
            date={date || ''}
            time={time || ''}
            />
            <RaffleModal
            isOpen={showRaffleModal}
            closeModal={() => {setShowRaffleModal(false)}}
            />
            <PageContainer>

            <FloatingMenu items={buttons}/>
                <div className="min-h-[100vh] w-full pb-[30%] justify-center items-center">
                    <div className="flex flex-col w-full max-h-[100%] p-4 mt-10 space-y-4 bg-white border shadow-lg rounded-md">
                    <div className="w-full tetx-lg font-[600]">
                        {title}
                    </div>
                    <div>
                        <img src={image} alt={title} className="rounded-md"/>
                    </div>
                    <div className="py-4 border-y h-[20vh] overflow-y-scroll">
                        {description}
                    </div>
                    {loc && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <FaLocationDot />
                                </div>
                                <div>
                                    Local:
                                </div>
                            </div>
                            <div className="font-[500]">{loc}</div>
                        </div>
                    )}
                    {date && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <FaCalendar />
                                </div>
                                <div>
                                    Data:
                                </div>
                            </div>
                            <div className="font-[500]">{date}</div>
                        </div>
                    )}
                    {time && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                    <IoTime />
                                </div>
                                <div>
                                    Hora:
                                </div>
                            </div>
                            <div className="font-[500]">{time}</div>
                        </div>
                    )}
                    {price && (
                        <div className="flex items-center w-full space-x-2">
                            <div className="font-bold flex items-center space-x-1">
                                <div>
                                <BsCash />
                                </div>
                                <div>
                                    Preço:
                                </div>
                            </div>
                            <div className="font-[500]">{price}</div>
                        </div>
                    )}

                    <div className="w-full flex items-center justify-center p-4">
                        <div 
                        onClick={typeFunctionController}
                        className="flex w-4/5 bg-black p-4 rounded-lg items-center justify-center shadow-md hover:scale-105 hover:brightness-90">
                                {type === "evento" && (
                                    <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                        <div>
                                            <FaTicketAlt/>
                                        </div>
                                        <div>
                                            Comprar Ingresso
                                        </div>
                                    </div>
                                )}
                                {type === "sorteio" && (
                                    <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                        <div>
                                            <FaTicketAlt/>
                                        </div>
                                        <div>
                                            Comprar Bilhete
                                        </div>
                                    </div>
                                )}
                                 {type === "ingresso" && (
                                    <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                        <div>
                                            <FaTicketAlt/>
                                        </div>
                                        <div>
                                            Ver ingresso
                                        </div>
                                    </div>
                                )}
                                {type === "bilhete" && (
                                    <div className="text-white text-lg font-[600] flex items-center space-x-4">
                                        <div>
                                            <MdWorkspacePremium/>
                                        </div>
                                        <div>
                                            Ver Resultado
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>




                </div>

                </div>
            </PageContainer>
        </>
    )
}