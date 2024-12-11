import { createContext, useState } from "react";
import { IProductOrderSumary } from "../components/ProductUnitController";
import { ICardObjectProps } from "../../../components/global/cardObject/CardObject";


interface IOrderResponse {
    message: string;
    id: number;
    order: {
        number: string;
        total: number;
        status: string;
        meio_contribuicao: string;
        external_id: number;
        method: number;
        mercadopago_status: number;
        installments: number;
        approved_at: string | null;
        qr_code_64: string;
    };
    payment: {
        qr_code: string;
        qr_code_64: string;
    };
}


interface ICheckOutContextProps {
    amount: number
    setAmount:(amount: number) => void
    items: IProductOrderSumary[]
    setItems: (items: IProductOrderSumary[]) => void
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
    const [items, setItems] = useState<IProductOrderSumary[]>([])
    const [object, setObject] = useState<ICardObjectProps | null>(null)
    const [order, setOrder] = useState<IOrderResponse | null>(null)
    
    return(
        <CheckoutContext.Provider value={{amount, setAmount, items, setItems, object, setObject, order, setOrder}}>
            {children}
        </CheckoutContext.Provider>
    )
}