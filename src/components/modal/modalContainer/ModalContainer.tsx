import React, { useRef, useEffect } from "react"
import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion";

export interface IModalContainerProps{
    isOpen: boolean
    closeModal: () => void
    children?: ReactNode
}


export default function ModalContainer({isOpen, closeModal, children} : IModalContainerProps){

    const modalRef = useRef<HTMLDivElement>(null)
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          closeModal()
        }
    }

    useEffect(() => {
        const handleEvent = (event: MouseEvent | TouchEvent) => {
          handleClickOutside(event)
        }
    
        document.addEventListener("mousedown", handleEvent)
        document.addEventListener("touchstart", handleEvent)
    
        return () => {
          document.removeEventListener("mousedown", handleEvent)
          document.removeEventListener("touchstart", handleEvent)
        }
      }, [])
    
    return(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                ref={modalRef}
                className="bg-white w-4/5 rounded-lg max-h-[90%] overflow-y-scroll shadow-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )
}