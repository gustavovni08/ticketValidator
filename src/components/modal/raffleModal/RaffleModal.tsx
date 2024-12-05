import ModalContainer from "../modalContainer/ModalContainer";

interface IRaffleModalProps {
    isOpen: boolean
    closeModal: () => void
}


export default function RaffleModal({isOpen, closeModal} : IRaffleModalProps){
    return(
        <ModalContainer isOpen={isOpen} closeModal={closeModal}>
            <>
            </>
        </ModalContainer>
    )
}