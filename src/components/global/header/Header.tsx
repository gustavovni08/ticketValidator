import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { SignUpContext } from "../../../contexts/SignInContext"
import { IoLogOut } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useActiveButton } from "../footer/context/ActiveButtonContext";
import { MdMenu } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import MenuHamburguer from "./components/MenuHamburguer";
import { IMenuNavBarProps } from "./components/MenuNavContainer";

export default function Header(){
    
    const navigate = useNavigate()
    const {setActiveButton} = useActiveButton()
    const {user, setUser} = useContext(SignUpContext)
    const [showMenu, setShowMenu] = useState(false)

    const routes : IMenuNavBarProps[] = [
        {
            title: 'Início',
            path: '/',            
        },
        {
            title: 'Jogos',
            path: '/Events',            
        },
        {
            title: 'Sorteios',
            path: '/Sweeptakes',            
        },
        {
            title: 'Meus Ingressos',
            path: '/Tickets',            
        },
        {
            title: 'Meus Bilhetes',
            path: '/Raffles',            
        },
        {
            title: 'Loja',
            path: '/',            
        },
        {
            title: 'Validar Ingresso',
            path: '/',            
        },
    ]

    return(
        <>
            <MenuHamburguer
            items={routes} 
            isOpen={showMenu}
            onClose={() => {
                setShowMenu(false)
            }}/>
            <div className={`flex items-center ${user ? 'justify-between' : 'justify-end'}  z-10 w-full fixed bg-white p-2 pr-4 border-b shadow-md space-x-4 text-lg`}>
            {user && (
                <div className="flex items-center space-x-4 pl-4">
                    <div>
                        <FaRegUserCircle/>
                    </div>
                    <div className="text-black text-sm">
                        {user.nome}
                    </div>
                </div>
            )}
            
            <div className="flex space-x-4">
                {user && (
                    <div 
                    onClick={() => {
                        setUser(null)
                        navigate('/')
                    }}
                    className="hover:scale-105 z-10 cursor-pointer">
                        <IoLogOut/>
                    </div>
                )}
                <div className="hover:scale-105 z-10 cursor-pointer">
                    <IoMdNotificationsOutline/>
                </div>
                <div 
                onClick={() => {
                    setShowMenu(true)
                }}
                className="hover:scale-105 cursor-pointer">
                    <MdMenu/>
                </div>
            </div>
        </div>
        </>
        
    )
}