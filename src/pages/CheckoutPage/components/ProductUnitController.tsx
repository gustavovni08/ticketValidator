import { useContext, useState } from "react";
import { ITicketType } from "../CheckoutPage";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { CheckoutContext } from "../context/CheckoutContext";
import { formatAmount } from "./SubtotalFooter";


export interface IProductOrderSumary {
    id: string
    title: string
    price: number
}

export default function ProductUnitController({eventID, price, qtdAvailable, ticketTypeID, ticketTypeName} : ITicketType){

    const [unitCounter, setUnitCounter] = useState<number>(0)
    const {amount, setAmount, items, setItems} = useContext(CheckoutContext)

    // function handleAddUnit(){
    //     if(unitCounter < qtdAvailable){
            
    //         setUnitCounter((prev) => prev + 1)
    //         const newAmount = parseFloat((amount + price).toFixed(2))
    //         setAmount(newAmount)

    //         const updatedItems = [...items]
    //         console.log('lista inicial')
    //         console.log(items)
    //         const item : IProductOrderSumary = {
    //             id: ticketTypeID,
    //             title: ticketTypeName,
    //             price: price
    //         }
    //         updatedItems.push(item)
    //         console.log('items adicionados')
    //         console.log(updatedItems)
    //         // setItems(updatedItems)

    //         return
    //     }

    //     window.alert('Quantidade excede o estoque.')
    // }

    // function handleClearProduct(){

    //     if(unitCounter > 0){
            
    //         setUnitCounter(0)
            
    //         console.log(items)
    //         const updatedItems = [...items]
            
    //         let cutAmount : number = 0
    //         updatedItems.forEach((item) => {

    //             if(item.id === ticketTypeID) parseFloat((cutAmount += item.price).toFixed(2))
            
    //         })
        
    //         console.log(cutAmount)
    //         const newAmount = amount - cutAmount
    //         setAmount(newAmount)

    //         const filtredList = updatedItems.filter((item) => {
    //             return(
    //                 item.id !== ticketTypeID
    //             )
    //         })

    //         console.log(filtredList)
    //         setItems(filtredList)
    //     }

    // }

    // function handleRemoveUnit() {
    //     if (unitCounter > 0) {
    //         let itemRemoved = false
            
    //         console.log('lista inicial')
    //         console.log(items)
    //         const updatedItems = items.filter((item) => {
    //             if (!itemRemoved && item.id === ticketTypeID) {
    //                 itemRemoved = true
    //                 return false
    //             }
    //             return true
    //         });
    
    //         if (itemRemoved) {
    //             setUnitCounter((prev) => prev - 1)
            
    //             const newAmount = parseFloat((amount - price).toFixed(2))
    //             setAmount(newAmount)
            
    //             console.log('items removidos')
    //             console.log(updatedItems)
    //             setItems(updatedItems)
    //         }
    
    //         return
    //     }
    // }

    return(
        <div className="flex flex-col p-4 w-full space-y-4">
            <div className="pl-4 font-[500]">
                Valor Unitário: R$ {formatAmount(price)}
            </div>
            <div className="flex rounded-full shadow-md p-4 items-center border-black border justify-between">
                <div>{ticketTypeName}</div>
                <div className="flex items-center space-x-4 text-lg">
                    <div
                    // onClick={handleClearProduct}
                    className={` ${unitCounter > 0 ? 'text-black hover:scale-105 rounded-full cursor-pointer' :  'text-gray-400 cursor-not-allowed'} flex items-center justify-center`}
                    >
                        <FaRegTrashAlt/>
                    </div>
                    <div 
                    // onClick={handleRemoveUnit}
                    className="hover:scale-105 hover:shadow-md rounded-full flex items-center justify-center cursor-pointer">
                        <IoIosRemove />
                    </div>
                    <div>
                        {unitCounter}
                    </div>
                    <div 
                    // onClick={handleAddUnit}
                    className="hover:scale-105 hover:shadow-md rounded-full flex items-center justify-center cursor-pointer">
                        <IoIosAdd   />
                    </div>
                </div>
            </div>
        </div>
    )

}