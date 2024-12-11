import { useContext } from "react";
import Button from "../../../components/buttons/Button";
import { CheckoutContext } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { ICardObjectProps } from "../../../components/global/cardObject/CardObject";
import axios from "axios"


interface ISubtotalFooterProps {
    object: ICardObjectProps
}

export function formatAmount(amount: number){
    const fixedAmount = amount.toFixed(2)
    const formattedAmount = fixedAmount.replace('.', ',')
    return formattedAmount
}

export default function SubtotalFooter({object}: ISubtotalFooterProps){

    const {amount, items, setObject, setOrder} = useContext(CheckoutContext)
    const navigate = useNavigate()

    async function handleNavigatePayment() {
        console.log(object)
        setObject(object)
        
        const body = {
            preco: amount,
            email: 'gustavovni08@gmail.com',
            description: `${object.title} - ${object.type}`
        }
        
        try {
            const {data} = await axios.post('https://api-totem.pacsafe.com.br/api/checkout', body)
            setOrder(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
        navigate('/Payment')
    }
    
    return(
        <div className="flex flex-col w-full bg-white shadow-md fixed bottom-0 p-4 border-t">
            <div className="font-[600]">Subtotal</div>
            <div className="flex w-full justify-between items-center">
                <div className="font-[600] flex items-center h-full">R$ {formatAmount(amount)}</div>
                <div>
                    <Button value="Pagar" disabled={items.length === 0} onClick={handleNavigatePayment}/>
                </div>
            </div>
        </div>
    )
}