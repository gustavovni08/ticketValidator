import { useNavigate } from "react-router-dom"

export interface IFloatingButtonProps {
    label: string
    icon: JSX.Element
    path?: string
    onClick: () => void
    row?: boolean
}

export default function FloatingButton({label, icon, path, row, onClick} : IFloatingButtonProps){
    
    const navigate = useNavigate()

    function handleNavigate(){
        if(path){
            navigate(path)
        }
    }
    
    return(
        <div 
        onClick={() => {
            handleNavigate()
            onClick()
        }}
        className={`flex flex-col items-center justify-center p-4 bg-black text-white rounded-lg shadow-md space-y-2 hover:scale-105 hover:brightness-90 cursor-pointer ${ label ? 'w-[80px] h-[100px]' : 'h-[40px]'}`}>
            <div className={`flex justify-center items-center ${ label ? '' : 'pt-2'}`}>
                {icon}
            </div>
            <div className="text-center text-sm">
                {label}
            </div>
        </div>
    )
}
