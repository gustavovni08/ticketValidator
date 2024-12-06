import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { SignUpContext } from "../../../contexts/SignInContext"
import { IoLogOut } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useActiveButton } from "../footer/context/ActiveButtonContext";
import { MdMenu } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Header(){
    
    const navigate = useNavigate()
    const {setActiveButton} = useActiveButton()
    const {user, setUser} = useContext(SignUpContext)

    return(
        <div className="z-10 w-full fixed bg-white flex justify-end p-2 pr-4 border-b shadow-md space-x-4 text-lg">
            <div className="hover:scale-105">
                <IoMdNotificationsOutline/>
            </div>
            <div className="hover:scale-105">
                <MdMenu/>
            </div>
        </div>
    )
}