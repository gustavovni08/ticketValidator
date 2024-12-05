import Button from "../../buttons/Button";
import ModalContainer from "../modalContainer/ModalContainer";
import { IoMenuSharp } from "react-icons/io5";
import { FaTicket } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { useContext } from "react";
import { SignUpContext } from "../../../contexts/SignInContext";


interface ITicketModal {
    isOpen: boolean
    closeModal: () => void
    id: string
    ticketName: string,
    qrcode: string,
    date: string,
    time: string,
    location: string
}
export default function TicketModal({ closeModal, isOpen, id, ticketName, qrcode, date, time, location }: ITicketModal) {
    const { user } = useContext(SignUpContext);
  
    return (
      <ModalContainer isOpen={isOpen} closeModal={closeModal}>
        <div className="w-full max-w-md pb-10 flex flex-col items-center overflow-hidden">
          <div className="flex flex-col space-y-4 items-center text-lg font-semibold w-full">
  
            <div className="border-b flex items-center space-x-4 w-full py-4 px-4">
              <IoMenuSharp className="text-xl" />
              <div className="text-sm marquee-container">
                <div className="marquee">{ticketName}</div>
              </div>
            </div>
  

            <div>
              <img
                src={qrcode}
                alt={`${ticketName}#${id}`}
                className="rounded-md w-[150px] h-[150px]"
              />
            </div>
  
            {[
              { icon: <FaTicket />, label: "Número do Ingresso:", value: `#${id}` },
              { icon: <FaTicket />, label: "Nome do Ingresso:", value: ticketName },
              { icon: <FaRegUserCircle />, label: "Dono do Ingresso:", value: user?.nome || "N/A" },
              { icon: <FaRegUserCircle />, label: "Código do Usuário:", value: "#0001" },
              { icon: <FaLocationDot />, label: "Local do Evento:", value: location },
              { icon: <FaCalendar />, label: "Data do Evento:", value: date },
              { icon: <IoTime />, label: "Hora do Evento:", value: time },
            ].map((item, index) => (
              <div key={index} className="w-full pt-4 px-4 border-t flex items-center text-sm">
                <div className="text-lg text-gray-600 mr-4">{item.icon}</div>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">{item.label}</span>
                  <div className="marquee-container">
                    <div className="marquee">{item.value}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full flex justify-center pt-6">
              <Button value="Fechar" onClick={() => closeModal()} />
            </div>
          </div>
        </div>
      </ModalContainer>
    )
  }
  
  
  