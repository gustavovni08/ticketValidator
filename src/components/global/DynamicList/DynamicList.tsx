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
        <div className="w-full pt-10 min-h-[100vh] flex flex-col items-center">
            
            <div className="w-4/5 md:w-[60%] lg:w-[40%] m-2 my-4 font-semibold text-lg">
                {label}
            </div>

            {list && (
                <div 
                    className={`w-full ${secondaryList ? 'flex-row overflow-x-scroll' : 'flex-col space-y-4 justify-center items-center pl-10 pb-20'} flex`}
                >
                    {list.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-auto"
                        >
                            <CardObject
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                            />
                        </div>
                    ))}
                </div>
            )}

            
            {secondaryLabel && (
                <div className="w-4/5 md:w-[60%] lg:w-[40%] m-2 my-4 font-semibold text-lg">
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
                            className="flex-shrink-0 w-auto"
                        >
                            <CardObject
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
