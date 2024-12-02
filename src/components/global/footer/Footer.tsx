import NavContainer from "./components/NavContainer"
import { FaHome } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";


export default function Footer(){
    return(
        <div className="flex bg-white w-full border-t fixed bottom-0">
            <NavContainer icon={<FaHome/>} label="Home" path="/"/>
            <NavContainer icon={<FaTicketAlt/>} label="Eventos" path="/Events"/>
            <NavContainer icon={<MdWorkspacePremium/>} label="Sorteios" path="/Sweeptakes"/>
            <NavContainer icon={<FaRegUserCircle/>} label="User" path="/"/>

        </div>
    )
}