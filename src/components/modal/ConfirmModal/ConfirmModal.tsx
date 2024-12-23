import Button from "../../buttons/Button"
import ModalContainer from "../modalContainer/ModalContainer"
import { useEffect, useRef } from "react"
const sucessAnimation = require('./assets/succesAnimation.webm')
const errorAnimation = require('./assets/errorAnimation.webm')

export interface IConfirmModalProps {
    isOpen: boolean
    closeModal:() => void
    title: string
    type: 'confirm' | 'error'
    message?: string
    textButton?: string
    onConfirm?: () => void
    auxFunction?: () => void
    
}


export default function ConfirmModal({isOpen, closeModal, title, type ,message, textButton, onConfirm, auxFunction} : IConfirmModalProps){

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
          videoRef.current.play().catch((err) => {
            console.error("Erro ao reproduzir o vídeo:", err)
          })
        }
      }, [isOpen])

      console.log(type, closeModal, title, message, textButton, onConfirm)

    return(
        <ModalContainer 
        isOpen={isOpen}
        closeModal={() => {
            if (type === 'confirm' && onConfirm) {
                console.log('onConfirm')
                onConfirm()
            }
            closeModal()
        }}>
            <div className="flex flex-col">
                <div className="flex items-center justify-center w-full border-b font-[600] text-lg p-1">
                    {title}
                </div>
                <div className="flex items-center justify-center">
                    <video ref={videoRef} src={ type === 'confirm' ? sucessAnimation : errorAnimation} muted />
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="font-[500] w-1/2 text-center text-sm">
                        {message}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full p-4">
                <Button 
                    value={textButton || 'Fechar'} 
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