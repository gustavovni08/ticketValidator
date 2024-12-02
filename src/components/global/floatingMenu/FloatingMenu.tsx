import FloatingButton, { IFloatingButtonProps } from "./components/FloatingButton";

interface IFloatingMenuProps {
    items: IFloatingButtonProps[]
}

export default function FloatingMenu({items} : IFloatingMenuProps){
    return(
        <div className="w-full flex items-center justify-center pt-10">
            <div className="w-4/5 md:w-[60%] lg:w-[40%] flex items-center space-x-4">
                {items.map((item, index) => (
                    <FloatingButton
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    />
                ))}
            </div>
        </div>
    )
}