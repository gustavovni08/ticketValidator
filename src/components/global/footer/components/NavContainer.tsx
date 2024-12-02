import { useNavigate } from "react-router-dom"

interface INavContainerProps {
    icon: JSX.Element
    label: string
    path:string
}


export default function NavContainer({icon, label, path}: INavContainerProps){

    const navigate = useNavigate()

    function handleNavigate(){
        navigate(path)
    }

    return(
        <div 
        onClick={handleNavigate}
        className="flex flex-col p-4 border w-full justify-center items-center hover:scale-105 cursor-pointer">
            {icon}
            {label}
        </div>
    )
}