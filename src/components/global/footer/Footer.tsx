import NavContainer from "./components/NavContainer"
import { FaHome } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useActiveButton } from "./context/ActiveButtonContext";

export default function Footer(){

    const {activeButton, setActiveButton} = useActiveButton()

    return(
        <div className="flex  w-full border-t fixed -bottom-1">
            <NavContainer icon={<FaHome/>} label="Home" path="/" activeButton={activeButton} onClick={setActiveButton}/>
            <NavContainer icon={<FaTicketAlt/>} label="Eventos" path="/Events" activeButton={activeButton} onClick={setActiveButton}/>
            <NavContainer icon={<MdWorkspacePremium/>} label="Sorteios" path="/Sweeptakes" activeButton={activeButton} onClick={setActiveButton}/>
            <NavContainer icon={<FaRegUserCircle/>} label="User" path="/" activeButton={activeButton} onClick={setActiveButton}/>

        </div>
    )
}