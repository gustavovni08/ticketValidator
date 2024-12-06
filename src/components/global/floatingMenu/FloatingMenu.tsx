import FloatingButton, { IFloatingButtonProps } from "./components/FloatingButton";

interface IFloatingMenuProps {
    items: IFloatingButtonProps[]
}

export default function FloatingMenu({items} : IFloatingMenuProps){

    return(
        <div className="w-[90%] overflow-y-scroll flex items-center justify-start pt-10">
            <div className="flex items-center space-x-4">
                {items.map((item, index) => (
                    <FloatingButton
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    onClick={item.onClick}
                    />
                ))}
            </div>
        </div>
    )
}
