import { createContext, useState } from "react";
import { IProductOrderSumary } from "../components/ProductUnitController";
import { ICardObjectProps } from "../../../components/global/cardObject/CardObject";
import { ITicketType } from "../CheckoutPage";

interface Charge {
    user_id: number
    charge_type: string
    total_price: string
    payment_status: number
    payment_method: string
    discount_percentage: number | null
    total_price_discount: number
    status: number
    external_id: number
    updated_at: string
    created_at: string
    id: number
    ticket_url: string
    qr_code_pix: string
    chave_pix: string
  }
  
  
export interface IOrderResponse {
    message: string
    charge: Charge
}


interface ICheckOutContextProps {

    amount: number
    setAmount:(amount: number) => void
    items: ITicketType[]
    setItems: (items:ITicketType[]) => void
    object: ICardObjectProps | null
    setObject: (obj: ICardObjectProps | null) => void
    order: IOrderResponse | null
    setOrder: (order: IOrderResponse | null) => void

}


const defaultValues : ICheckOutContextProps = {
    amount: 0,
    setAmount: () => {},
    items: [],
    setItems: () => {},
    object: null,
    setObject:() => {},
    order: null,
    setOrder: (order: IOrderResponse | null) => {}

}

export const CheckoutContext = createContext(defaultValues)

interface ICheckoutContextProviderProps {
    children: React.ReactNode
}


export function CheckOutContextProvider({children} : ICheckoutContextProviderProps){
    
    const [amount, setAmount] = useState<number>(0)
    const [items, setItems] = useState<ITicketType[]>([])
    const [object, setObject] = useState<ICardObjectProps | null>(null)
    const [order, setOrder] = useState<IOrderResponse | null>(null)
    
    return(
        <CheckoutContext.Provider value={{amount, setAmount, items, setItems, object, setObject, order, setOrder}}>
            {children}
        </CheckoutContext.Provider>
    )
}