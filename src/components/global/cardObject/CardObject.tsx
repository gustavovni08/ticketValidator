import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { BsCash } from "react-icons/bs";
import { IoTime } from "react-icons/io5";
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
    className="w-full max-w-[400px] min-w-[300px] bg-white shadow-md flex flex-col hover:scale-105 hover:brightness-90 rounded-md transition-transform duration-200 ease-in-out">
        <div className="w-full h-[200px] overflow-hidden">
            <img src={image} alt={title} className="w-full  h-full object-cover rounded-t"/>
        </div>
        <div className="flex flex-col p-2">
            <div className="w-full font-semibold truncate">{title}</div>
            {location && (
                <div className="w-full text-gray-600 flex items-center space-x-1 text-sm truncate">
                    <div>
                        <FaLocationDot />
                    </div>
                    <div>
                        {location}
                    </div>
                </div>
            )}
            {date && (
                <div className="w-full text-gray-600 flex items-center space-x-1 text-sm truncate">
                    <div>
                        <FaCalendar />
                    </div>
                    <div>
                        {date}
                    </div>
                </div>
            )}
            {time && (
                <div className="w-full text-gray-600 flex items-center space-x-1 text-sm truncate">
                    <div>
                        <IoTime/>
                    </div>
                    <div>
                        {time}
                    </div>
                </div>
            )}
            {price && (
                <div className="w-full text-gray-600 flex items-center space-x-2 text-sm truncate">
                    <div>
                        <BsCash/>
                    </div>
                    <div>
                        {price}
                    </div>
                </div>
            )}
        </div>

    </div>
    )
}
