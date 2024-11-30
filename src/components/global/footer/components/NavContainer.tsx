interface INavContainerProps {
    icon: JSX.Element
    label: string
}


export default function NavContainer({icon, label}: INavContainerProps){
    return(
        <div className="flex flex-col p-4 border w-full justify-center items-center hover:scale-105">
            {icon}
            {label}
        </div>
    )
}