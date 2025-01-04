import { useContext } from "react";
import Button from "../../../components/buttons/Button";
import { CheckoutContext, IOrderResponse } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { ICardObjectProps } from "../../../components/global/cardObject/CardObject";
import axios from "axios"
import { SignUpContext } from "../../../contexts/SignInContext";
import { exequery, IExequery } from "../../../services/api";


interface ISubtotalFooterProps {
    object: ICardObjectProps
}

export function formatAmount(amount: number){
    const fixedAmount = amount.toFixed(2)
    const formattedAmount = fixedAmount.replace('.', ',')
    return formattedAmount
}

export default function SubtotalFooter({object}: ISubtotalFooterProps){

    const {user, token} = useContext(SignUpContext)
    const {amount, items, setObject, setOrder} = useContext(CheckoutContext)
    const navigate = useNavigate()

    async function handleNavigatePayment() {
        console.log(object)
        setObject(object)
        
        const body = {
            user_id: user?.id,
            amount: amount,
            ticket_type_id:items[0].id,
            quantity:1,
            payment_method:'pix'
        }
        
        try {
            if(object.type === 'evento'){  
                const query : IExequery = {
                    isPublic: false, 
                    method: 'post',
                    route: '/create-charge-ticket',
                    token:token,
                    body: body
                }
                const data : IOrderResponse = await exequery(query)

                setOrder(data)
                console.log(data)   
            }

            if(object.type === 'sorteio'){
                  
                const query : IExequery = {
                    isPublic: false, 
                    method: 'post',
                    route: '/create-charge-raffle',
                    token:token,
                    body: body
                }
                const data : IOrderResponse = await exequery(query)

                setOrder(data)
                console.log(data)   
            }
        
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