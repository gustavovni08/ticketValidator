import Button from "../../buttons/Button"
import ModalContainer from "../modalContainer/ModalContainer"
import { useEffect, useRef } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { MdError } from "react-icons/md";
export interface IConfirmModalProps {
    isOpen: boolean
    closeModal:() => void
    title: string
    type: 'confirm' | 'error'
    message?: string
    textButton?: string
    onConfirm?: () => void
    closeButton?: boolean
    auxFunction?: () => void
    autoClose?: boolean
    closeTime?: number
    
}


export default function ConfirmModal({isOpen, closeModal, title, type ,message, textButton, onConfirm, auxFunction, closeButton, autoClose, closeTime} : IConfirmModalProps){

    useEffect(() => {
        let intervalId: any;
    
        if (autoClose && isOpen) {
            intervalId = setTimeout(() => {
                if (onConfirm) onConfirm();
                closeModal();
            }, closeTime);
        }
    
        return () => {
            if (intervalId) clearTimeout(intervalId);
        };
    }, [isOpen, autoClose, closeTime, onConfirm, closeModal]);

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
                <div className="flex items-center justify-center m-4">
                   {type === 'confirm' && (<FaCheckCircle fill="#4CAF50" size={90}/>)}
                   {type === 'error' && (<MdError fill="#F44336" size={90}/>)}
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="font-[500] w-1/2 text-center text-sm">
                        {message}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full p-4 space-y-2">
                <Button 
                    value={textButton || 'Fechar'} 
                    onClick={async () => {
                        if(onConfirm){
                            await onConfirm()
                        }
                    }}/>
                {closeButton && (
                    <Button 
                    value={'Fechar'} 
                    onClick={() => {
                        closeModal()
                    }}/>
                )}
                </div>
            </div>
        </ModalContainer>
    )
}