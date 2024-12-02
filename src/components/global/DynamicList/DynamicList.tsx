import CardObject, { ICardObjectProps } from "../cardObject/CardObject";
interface IDynamicListProps {
    label: string
    list: ICardObjectProps[]
    secondaryLabel?: string
    secondaryList?: ICardObjectProps[]
}

export default function DynamicList({ label, list, secondaryLabel, secondaryList }: IDynamicListProps) {
    return (
        <div className="w-full pt-10 min-h-[100vh] flex flex-col items-center">
            <div className="w-4/5 md:w-[60%] lg:w-[40%] m-2 text-white font-semibold">
                {label}
            </div>
            {list && (
                <div className={`flex flex-col items-center ${secondaryList ? 'h-[60vh]' : 'h-[80vh]'} overflow-hidden overflow-y-scroll ${secondaryList ? 'space-y-4' : 'space-y-10'}`}>
                    {!secondaryList && list.map((item, index) => (
                        <CardObject
                            key={index}
                            image={item.image}
                            title={item.title}
                            location={item.location}
                            date={item.date}
                        />
                    ))}
                    {secondaryList && list.slice(0,2).map((item, index) => (
                        <CardObject
                            key={index}
                            image={item.image}
                            title={item.title}
                            location={item.location}
                            date={item.date}
                        />
                    ))}
                </div>
            )}
            {secondaryLabel && (
                <div className="w-4/5 md:w-[60%] lg:w-[40%] m-2 text-white font-semibold">
                    {secondaryLabel}
                </div>
            )}
            {secondaryList && (
                <div className={`flex flex-col items-center h-[70vh] overflow-hidden overflow-y-scroll ${secondaryList ? 'space-y-4' : 'space-y-10'}`}>
                    {secondaryList.slice(0,2).map((item, index) => (
                        <CardObject
                            key={index}
                            image={item.image}
                            title={item.title}
                            location={item.location}
                            date={item.date}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
