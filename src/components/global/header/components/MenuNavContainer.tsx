import { useNavigate } from "react-router-dom"

export interface IMenuNavBarProps{
    title: string
    path: string
}


export default function MenuNavBar({title, path} : IMenuNavBarProps){
    
    const navigate = useNavigate() 
    
    function handleNavigation(){
        navigate(path)
    }

    return(
        <div 
        className="bg-black p-2 pl-4 text-[0.8rem] font-[400] shadow-md flex items-center justify-start text-white rounded-md border-md m-4 hover:scale-95"
        onClick={handleNavigation}>
            {title}
        </div>
    )
}