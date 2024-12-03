import { useNavigate } from "react-router-dom"

export interface IFloatingButtonProps {
    label: string
    icon: JSX.Element
    path: string
    onClick: () => void
    row?: boolean
}

export default function FloatingButton({label, icon, path, row, onClick} : IFloatingButtonProps){
    
    const navigate = useNavigate()

    function handleNavigate(){
        navigate(path)
    }
    
    return(
        <div 
        onClick={() => {
            handleNavigate()
            onClick()
        }}
        className={` ${row ? 'flex-row' : 'flex-col' } p-2 bg-white rounded-lg shadow-md flex justify-between items-center space-x-1 hover:scale-105 hover:brightness-90`}>
            <div>
                {icon}
            </div>
            <div>
                {label}
            </div>
        </div>
    )
}