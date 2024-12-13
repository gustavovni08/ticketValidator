import Button from "../../buttons/Button"
import ModalContainer from "../modalContainer/ModalContainer"
import { useEffect, useRef } from "react"
const animation = require('./assets/animation.webm')

interface IConfirmModalProps {
    isOpen: boolean
    closeModal:() => void
    title: string
    message?: string
    textButton?: string
    onConfirm?: () => void
    
}


export default function ConfirmModal({isOpen, closeModal, title, message, textButton, onConfirm} : IConfirmModalProps){

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
          videoRef.current.play().catch((err) => {
            console.error("Erro ao reproduzir o vídeo:", err)
          })
        }
      }, [isOpen])

    return(
        <ModalContainer 
        isOpen={isOpen}
        closeModal={closeModal}>
            <div className="flex flex-col">
                <div className="flex items-center justify-center w-full border-b font-[600] text-lg p-1">
                    {title}
                </div>
                <div className="flex items-center justify-center">
                    <video ref={videoRef} src={animation} muted />
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="font-[500] w-1/2 text-center text-sm">
                        {message}
                    </div>
                </div>
                <div className="flex items-center justify-center w-full p-4">
                <Button 
                    value={textButton || 'Confirmar'} 
                    onClick={() => {
                        if(onConfirm){
                            onConfirm()
                        }
                        closeModal()
                    }}/>
                </div>
            </div>
        </ModalContainer>
    )
}