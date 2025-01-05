import { useContext } from "react";
import { ITicketType } from "../CheckoutPage";
import { formatAmount } from "./SubtotalFooter";
import { CheckoutContext } from "../context/CheckoutContext";

export default function SelectItemContainer({
    eventID,
    price,
    qtdAvailable,
    ticketTypeID,
    ticketTypeName
}: ITicketType) {

    const { setItems, setAmount, items } = useContext(CheckoutContext);

    function handleSetItem() {
        const ticketType: ITicketType = {
            eventID,
            price,
            qtdAvailable,
            ticketTypeID,
            ticketTypeName,
        };
        
        const updatedItems = [ticketType];
        setItems(updatedItems); 
        setAmount(ticketType.price);
    }

    const isSelected = items.some(item => item.ticketTypeID === ticketTypeID);

    return (
        <div className="flex flex-col p-4 w-full space-y-4">
            <div className="pl-4 font-[500]">
                Valor Unitário: R$ {formatAmount(price)}
            </div>

            <div 
                onClick={handleSetItem}
                className={`flex rounded-full shadow-md p-4 items-center border-black border justify-between hover:scale-105 ${isSelected ? 'bg-black text-white' : ''}`}
            >
                <div>{ticketTypeName}</div>
            </div>
        </div>
    );
}
