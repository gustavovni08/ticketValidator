import { useNavigate } from "react-router-dom"

export interface IFloatingButtonProps {
    label: string
    icon: JSX.Element
    path: string
}

export default function FloatingButton({label, icon, path} : IFloatingButtonProps){
    
    const navigate = useNavigate()

    function handleNavigate(){
        navigate(path)
    }
    
    return(
        <div 
        onClick={handleNavigate}
        className="w-full max-w-[50%] bg-white rounded-md shadow-md py-4 px-2 flex justify-between items-center space-x-1 hover:scale-105 hover:brightness-90">
            <div>
                {icon}
            </div>
            <div>
                {label}
            </div>
        </div>
    )
}