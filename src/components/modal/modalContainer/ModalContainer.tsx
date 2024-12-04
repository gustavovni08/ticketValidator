import React, { useRef, useEffect } from "react"
import { ReactNode } from "react"

export interface IModalContainerProps{
    isOpen: boolean
    closeModal: () => void
    children: ReactNode
}


export default function modalContainer({isOpen, closeModal, children} : IModalContainerProps){

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
        <>
            {isOpen && (
                <div 
                ref={modalRef}
                className="z-20 inset-0 bg-black opacity-20 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md">
                        {children}
                    </div>
                </div>
            )}
        </>
        
    )
}