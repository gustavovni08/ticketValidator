import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MenuNavBar, { IMenuNavBarProps } from './MenuNavContainer'

interface IMenuHamburguerProps {
    isOpen: boolean
    onClose: () => void
    items: IMenuNavBarProps[]
}


export default function MenuHamburguer({isOpen, onClose, items} : IMenuHamburguerProps){
    
    const [isAnimating, setIsAnimating] = useState<boolean>(false)

    function handleClose(){
        setIsAnimating(true)
        setTimeout(() => {
            onClose()
            setIsAnimating(false)
        }, 300)
    }
    
    return (
        <AnimatePresence>
            {isOpen && !isAnimating && (
                <div
                    onClick={handleClose}
                    className="h-[100vh] bg-black bg-opacity-20 z-20 w-full flex justify-end fixed"
                >
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={(event) => {
                            event.stopPropagation()
                        }}
                        className="bg-white w-[75%]"
                    >
                        <div className='w-full flex items-center border-b justify-end px-4 py-2'>
                            <div 
                            onClick={handleClose}
                            className="text-sm p-1 hover:underline">
                                Fechar
                            </div>
                        </div>
                        <div className="px-2">
                            {items.map((item, index) => (
                                <MenuNavBar key={index} path={item.path} title={item.title} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}