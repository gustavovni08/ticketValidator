import { useNavigate } from "react-router-dom";
import CardObject, { ICardObjectProps } from "../cardObject/CardObject";
import { IDetailsPageProps } from "../../../pages/DetailsPage/DetailsPage";

interface IDynamicListProps {
    label: string;
    list: ICardObjectProps[];
    secondaryLabel?: string;
    secondaryList?: ICardObjectProps[];
}

export default function DynamicList({ 
    label, 
    list, 
    secondaryLabel, 
    secondaryList 
}: IDynamicListProps) {

    const navigate = useNavigate()

    return (
        <div className="w-full pt-10 min-h-[100vh] pb-20 flex flex-col items-center">
            
            <div className="w-[90%] md:w-[60%] lg:w-[40%] m-2 my-4 font-semibold text-lg">
                {label}
            </div>

            {list && (
                <div 
                    className={`w-full ${secondaryList ? 'flex-row overflow-x-scroll' : 'flex-col space-y-4 justify-center items-center pl-10 pb-20'} flex`}
                >
                    {list.map((item, index) => (
                        <div 
                            key={index} 
                            className={`flex-shrink-0 ${ secondaryList ? 'w-[90%]' : 'w-full'}`}
                        >
                            <CardObject
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                description={item.description}
                                obj_type={item.obj_type}
                                time={item.time}
                                price={item.price}
                            />
                        </div>
                    ))}
                </div>
            )}

            
            {secondaryLabel && (
                <div className="w-[90%] md:w-[60%] lg:w-[40%] m-2 my-4 font-semibold text-lg">
                    {secondaryLabel}
                </div>
            )}

            {secondaryList && (
                <div 
                    className={`w-full flex-row overflow-x-scroll flex space-x-2 items-center`}
                >
                    {secondaryList.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-[90%]"
                        >
                            <CardObject
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                description={item.description}
                                obj_type={item.obj_type}
                                time={item.time}
                                price={item.price}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
