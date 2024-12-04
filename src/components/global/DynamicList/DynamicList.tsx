import CardObject, { ICardObjectProps } from "../cardObject/CardObject";

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


    return (
        <div className="w-full pt-10 min-h-[100vh] pb-20 flex flex-col items-center">
            
            <div className="w-[90%] m-2 my-4 font-semibold text-lg">
                {label}
            </div>

            {list && (
                <div 
                    className={`w-full ${secondaryList ? 'flex-row overflow-x-scroll scrollbar-thin space-x-4 scrollbar-track-transparent overflow-hidden' : 'flex-col justify-center items-center pb-20'}  p-4 flex`}
                >
                    {list.map((item, index) => (
                            <CardObject
                                key={index}
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                description={item.description}
                                obj_type={item.obj_type}
                                time={item.time}
                                price={item.price}
                            />
                        
                    ))}
                </div>
            )}

            
            {secondaryLabel && (
                <div className="w-[90%] m-2 my-4 font-semibold text-lg">
                    {secondaryLabel}
                </div>
            )}

            {secondaryList && (
                <div 
                    className={`w-full flex-row overflow-x-scroll scrollbar-thin scrollbar-track-transparent overflow-hidden flex space-x-4 items-center p-4`}
                >
                    {secondaryList.map((item, index) => (
                            <CardObject
                                key={index}
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                description={item.description}
                                obj_type={item.obj_type}
                                time={item.time}
                                price={item.price}
                            />
                    ))}
                </div>
            )}
        </div>
    );
}
