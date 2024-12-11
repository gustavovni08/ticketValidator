import { FaHome } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { IoMdFootball } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import image from "../../../assets/pngwing.com.png";
import { useNavigate } from "react-router-dom";


import NavContainer from "./components/NavContainer";
import { useActiveButton } from "./context/ActiveButtonContext";

export default function Footer() {
  const { activeButton, setActiveButton } = useActiveButton();
  const navigate = useNavigate();


  return (
    <div className="flex w-full h-[10vh] fixed -bottom-1">
      <NavContainer
        icon={<FaHome />}
        label="Home"
        path="/"
        activeButton={activeButton}
        onClick={setActiveButton}
      />
      <NavContainer
        icon={<IoMdFootball />}
        label="Jogos"
        path="/Events"
        activeButton={activeButton}
        onClick={setActiveButton}
      />
      <div className="bg-white flex items-start justify-center relative">
        <div
          onClick={() => {
            navigate('/Sweeptakes');
            setActiveButton('');
          }}
          className="w-20 h-20 bg-gray-100 rounded-full border shadow-lg relative -top-6 flex items-center justify-center z-10 hover:scale-105 hover:brightness-90 cursor-pointer"
        >
          <img
            src={image}
            alt="Logo"
            className="w-14 h-14 object-cover animate-custom-pulse"
          />
        </div>
      </div>
      <NavContainer
        icon={<FaTicketAlt />}
        label="Ingressos"
        path="/Sweeptakes"
        activeButton={activeButton}
        onClick={setActiveButton}
      />
      <NavContainer
        icon={<IoStorefront />}
        label="loja"
        path="/"
        activeButton={activeButton}
        onClick={setActiveButton}
      />
    </div>
  );
}
