import NavContainer from "./components/NavContainer"
import { FaHome } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";


export default function Footer(){
    return(
        <div className="flex bg-white w-full">
            <NavContainer icon={<FaHome/>} label="Home" />
            <NavContainer icon={<FaTicketAlt/>} label="Eventos" />
            <NavContainer icon={<MdWorkspacePremium/>} label="Sorteios" />
            <NavContainer icon={<FaRegUserCircle/>} label="User" />

        </div>
    )
}