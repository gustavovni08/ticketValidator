import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IDetailsPageProps } from "../../../pages/DetailsPage/DetailsPage";
import { useNavigate } from "react-router-dom";

export interface ICardObjectProps {
    obj_type: 'evento' | 'sorteio' | 'bilhete' | 'ingresso'
    description: string
    image: string
    title: string
    location?: string
    date?: string
    time?: string
    price?: string
}



export default function CardObject({
    image,
    title,
    obj_type,
    description,
    location,
    date,
    time,
    price
}: ICardObjectProps) {

    const navigate = useNavigate()

    function handleNavigateDetails(){

        const detailObject : IDetailsPageProps = {
            obj_ID: 1,
            obj_type: obj_type,
            description: description,
            image: image,
            title: title,
            location: location,
            date: date,
            time: time,
            price: price
        }
    
        navigate('/Details', {state: detailObject})

    
    }

    return (
        <div 
        onClick={handleNavigateDetails}
        className="w-4/5 md:w-[60%] lg:w-[40%] h-full cursor-pointer shadow-xl rounded-lg flex flex-col items-center hover:scale-105 hover:brightness-90">
            <div className="w-full">
                <img
                    src={image}
                    alt={title}
                    className="rounded-t w-full max-h-[200px] object-cover"
                />
            </div>
            <div  className="w-full h-full rounded-b bg-white flex flex-col justify-center p-2">
                <div className="w-full text-md font-[600] truncate">{title}</div>
                <div className="w-full flex justify-between flex-col  text-sm">
                    {location && (
                        <div className="flex items-center space-x-1">
                            <div>
                                <FaLocationDot />
                            </div>
                            <div className="w-full">{location}</div>
                        </div>
                    )}
                    {date && (
                        <div className="flex items-center space-x-1">
                            <div>
                                <FaCalendar />
                            </div>
                            <div className="w-1/2">{date}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
