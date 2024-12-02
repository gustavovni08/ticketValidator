import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";

export interface ICardObjectProps {
    image: string;
    title: string;
    location?: string;
    date?: string;
}

export default function CardObject({
    image,
    title,
    location,
    date,
}: ICardObjectProps) {
    return (
        <div className="w-4/5 md:w-[60%] lg:w-[40%] cursor-pointer shadow-lg rounded-lg flex flex-col items-center hover:scale-105 hover:brightness-90">
            <div className="w-full">
                <img
                    src={image}
                    alt={title}
                    className="rounded-t w-full max-h-[200px] object-cover"
                />
            </div>
            <div className="w-full rounded-b bg-white flex flex-col justify-center p-2">
                <div className="w-full text-md font-[600]">{title}</div>
                <div className="w-full flex justify-between items-center text-sm">
                    {location && (
                        <div className="flex items-center space-x-1">
                            <div>
                                <FaLocationDot />
                            </div>
                            <div>{location}</div>
                        </div>
                    )}
                    {date && (
                        <div className="flex items-center space-x-1">
                            <div>
                                <FaCalendar />
                            </div>
                            <div>{date}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
