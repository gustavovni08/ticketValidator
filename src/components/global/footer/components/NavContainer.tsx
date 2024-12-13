import { useNavigate } from "react-router-dom"


interface INavContainerProps {
    icon: JSX.Element
    label: string
    path?: string
    activeButton: string
    onClick: () => void
}


export default function NavContainer({icon, label, path, activeButton, onClick}: INavContainerProps){


    const navigate = useNavigate()

    function handleNavigate(){
      
        if(path) navigate(path)

    }

    return(
        <div 
        onClick={() => {
            handleNavigate()
            onClick()
        }}
        className={`flex flex-col p-4 ${ label === activeButton ? 'text-black': ' text-gray-500 hover:brightness-90'} bg-white w-full h-full justify-center text-sm items-center cursor-pointer`}>
            {icon}
            {label}
        </div>
    )
}