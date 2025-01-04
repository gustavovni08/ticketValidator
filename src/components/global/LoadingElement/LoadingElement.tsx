import { motion } from "framer-motion"

interface LoadingElementProps {
    isLoading: boolean
    children: React.ReactNode
}


export default function LoadingElement({isLoading, children} : LoadingElementProps){
    return(
        <>
            {isLoading ? (
            <div className="flex justify-center items-center h-48">
                <motion.div
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        ) : (
            children
        )}        
        </>

    )
}