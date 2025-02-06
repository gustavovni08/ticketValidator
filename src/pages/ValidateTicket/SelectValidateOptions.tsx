import { useEffect, useState } from "react"
import { exequery, IExequery } from "../../services/api"
import { Event } from "../homePage/HomePage"
import LoadingElement from "../../components/global/LoadingElement/LoadingElement"

export default function SelectValidationOptions(){

    const [events, setEvents] = useState<Event[]>([])
    const [selectedEvent, setSelectEvent] = useState<string>()
    const [isLoading, setIsloading] = useState<boolean>(false)

    const getEvents = async () => {
        try {
            setIsloading(true)
            const query : IExequery = {
                
                isPublic: true,
                route:'/events',
                method:'get',
                token: ''

            }

            const data = await exequery(query)
            setEvents(data)
        
        } catch (error) {
            console.error(error)
        }finally {
            setIsloading(false)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return(
        <div className="min-h-[100vh] w-full bg-white flex flex-col items-center pt-10">
            <LoadingElement isLoading={isLoading}>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-[80%]">
                        <p>Escolha o Evento para validar:</p>
                        <select className="w-full my-1 rounded-md bg-gray-200"
                        onChange={((event) => {
                            
                        })}>
                            {events && (
                                events.map((item) => {
                                    return(
                                        <option value={item.title}>{item.title}</option>
                                    )
                                })
                            )}    
                        </select>
                    </div>
                </div> 
            </LoadingElement>

        </div>
    )
}