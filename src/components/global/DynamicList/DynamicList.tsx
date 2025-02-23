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
            
            <div className="w-[90%] text-white m-2 my-4 font-semibold text-lg">
                {label}
            </div>

            {list && (
                <div 
                    className={`w-full ${secondaryList ? 'flex-row overflow-x-scroll space-x-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent overflow-hidden' : 'flex-col justify-center items-center pb-20 space-y-4'}  p-4 flex`}
                >
                    {list.map((item, index) => (
                            <CardObject
                                key={index}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                description={item.description}
                                type={item.type}
                                time={item.time}
                                price={item.price}
                                qrcode={item.qrcode}
                                result={item.result}
                            />
                        
                    ))}
                </div>
            )}

            {list && list.length === 0 && (
                <div className={`w-full flex-row overflow-x-scroll  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent overflow-hidden flex space-x-4 items-center p-4`}>
                                <CardObject
                                id={'1'}
                                image={'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-erro-404_114360-2515.jpg?t=st=1736103570~exp=1736107170~hmac=f1a17342a2fc19b6654a8b3752f1fbbd14fba64552cf58cca11fcc412d8ce2d8&w=826'}
                                title={'Items não encontrados'}
                                location={''}
                                date={''}
                                description={''}
                                type={'none'}
                                time={''}
                                price={''}
                                qrcode={''}
                                result={''}
                            />
                        
                </div>
            )}
            
            {secondaryLabel && (
                <div className="w-[90%] text-white m-2 my-4 font-semibold text-lg">
                    {secondaryLabel}
                </div>
            )}

            {secondaryList && (
                <div 
                    className={`w-full flex-row overflow-x-scroll  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent overflow-hidden flex space-x-4 items-center p-4`}
                >
                    {secondaryList.map((item, index) => (
                            <CardObject
                                key={index}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                description={item.description}
                                type={item.type}
                                time={item.time}
                                price={item.price}
                                qrcode={item.qrcode}
                                result={item.result}
                            />
                    ))}
                </div>
            )}
            
            {secondaryList && secondaryList.length === 0 && (
                <div className={`w-full flex-row overflow-x-scroll  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent overflow-hidden flex space-x-4 items-center p-4`}>
                                <CardObject
                                id={'1'}
                                image={'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-erro-404_114360-2515.jpg?t=st=1736103570~exp=1736107170~hmac=f1a17342a2fc19b6654a8b3752f1fbbd14fba64552cf58cca11fcc412d8ce2d8&w=826'}
                                title={'Items não encontrados'}
                                location={''}
                                date={''}
                                description={''}
                                type={'none'}
                                time={''}
                                price={''}
                                qrcode={''}
                                result={''}
                            />
                        
                </div>
            )}
        </div>
    )
}
