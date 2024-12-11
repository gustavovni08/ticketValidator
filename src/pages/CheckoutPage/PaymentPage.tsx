import { useContext } from "react"
import { CheckoutContext, CheckOutContextProvider } from "./context/CheckoutContext"

// export default function PaymentPage(){
//     return(
//         <CheckOutContextProvider>
//             <PaymentPageContent/>
//         </CheckOutContextProvider>
//     )
// }

export default function PaymentPage(){
    const {amount, items, object, order} = useContext(CheckoutContext)

    console.log(object)
    console.log(order)

    return(
        <div className="flex flex-col space-y-2">
            <div className="w-full flex justify-between border-b p-2 fixed bg-white shadow-sm">
                <div className="font-[600]">
                    Checkout
                </div>
                <div className="font-[600]">
                    Ingresos PacSafe
                </div>
            </div>
            <div className="w-full max-h-[100vh] pb-48 overflow-y-scroll items-center flex flex-col pt-10">
                <div className="w-[90%] flex flex-col items-center justify-center space-y-4">
                    <div className="font-[600] text-lg" >
                        {object?.title}
                    </div>
                </div>
            </div>
        </div>
    )
}