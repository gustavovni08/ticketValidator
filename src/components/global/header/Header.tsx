import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { SignUpContext } from "../../../contexts/SignInContext"
import { IoLogOut } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header(){
    
    const navigate = useNavigate()
    const {user, setUser} = useContext(SignUpContext)

    return(
        <div className="z-10 w-full fixed bg-white flex justify-end p-2 pr-4 border-b shadow-md">
            {!user && (
                <div 
                onClick={() => {navigate('/SignIn')}}
                className="bg-black text-white p-1 rounded-md font-[400] text-sm hover:brightness-105 transition duration-300 hover:scale-105 cursor-pointer">
                    Entrar
                </div>
            )}
            {user && (
                <div className="flex w-full items-center justify-between px-4 p-1">
                    <div className="flex items-center space-x-1">
                        <div>
                            <FaRegUserCircle/>
                        </div>
                        <div>
                            {user.nome}
                        </div>
                    </div>
                    <div 
                    onClick={() => {setUser(null)}}
                    className="hover:scale-110">
                        <IoLogOut/>
                    </div>
                </div>
            )}
        </div>
    )
}