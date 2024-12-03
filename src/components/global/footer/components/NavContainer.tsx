import { useNavigate } from "react-router-dom"


interface INavContainerProps {
    icon: JSX.Element
    label: string
    path: string
    activeButton: string
    onClick: (val: string) => void
}


export default function NavContainer({icon, label, path, activeButton, onClick}: INavContainerProps){


    const navigate = useNavigate()

    function handleNavigate(){
        navigate(path)
    }

    return(
        <div 
        onClick={() => {
            handleNavigate()
            onClick(label)
        }}
        className={`flex flex-col p-4 ${ label === activeButton ? 'bg-black text-white': 'bg-white border'} w-full h-full justify-center items-center hover:scale-105 cursor-pointer`}>
            {icon}
            {label}
        </div>
    )
}