import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ModalContainer from "../modalContainer/ModalContainer"
import Confetti from "react-confetti"
import { FaTicketAlt } from "react-icons/fa"
import { FaTrophy } from "react-icons/fa";
import Button from "../../buttons/Button"

interface IRaffleModalProps {
  isOpen: boolean
  closeModal: () => void
  id: string
  result: string
  description: string
}

export default function RaffleModal({ isOpen, closeModal, id, result, description }: IRaffleModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [displayResult, setDisplayResult] = useState("")
  const [randomNumber, setRandomNumber] = useState("")
  const [showRules, setShowRules] = useState(false)

  useEffect(() => {
    if (id === result) {
      setShowConfetti(true)
    }
  }, [isOpen, id, result])


  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isOpen) {
      interval = setInterval(() => {
        setRandomNumber(() => Math.floor(Math.random() * 1000).toString())
      }, 100)

      setTimeout(() => {
        clearInterval(interval)
        setDisplayResult(result)
      }, 3000)
    }

    if(!isOpen){
        setDisplayResult('')
    }

    return () => clearInterval(interval)
  }, [isOpen, result])

  return (
    <ModalContainer isOpen={isOpen} closeModal={closeModal}>
      {showConfetti && displayResult && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
      { showRules && (
            <ModalContainer isOpen={showRules} closeModal={() => {setShowRules(false)}}>
                <div className="w-full flex flex-col min-h-[50vh] max-h-[50vh] py-4 space-y-4">
                    <div className="font-bold text-xl mb-4 text-center flex items-center w-full justify-center space-x-1 border-b pb-4">
                        Regras do sorteio
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="py-4 w-[90%] h-[30vh] overflow-y-scroll">
                            {description}
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Button value="Fechar" onClick={() => {setShowRules(false)}}/>
                    </div>


                </div>
            </ModalContainer>
        )
      }
      <motion.div
        className="w-full flex flex-col min-h-[50vh] py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="font-bold text-xl mb-4 text-center flex items-center w-full justify-center space-x-1 border-b pb-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
            <div>
                <FaTicketAlt/>
            </div>
            <div>
                Seu número:
            </div>
            <div>
                {id}
            </div>
         
        </motion.div>

        <motion.div
          className="flex flex-col w-full items-center justify-center space-x-1 text-2xl font-semibold text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
            <div>
                <FaTrophy />
            </div>
            <div>
                Número Vencedor
            </div>
        </motion.div>

        <motion.div
          className="text-4xl font-bold text-center"
          style={{ color: "#FF4500" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [0.8, 1.1, 1] }}
          transition={{ duration: 1, delay: 1 }}
        >
          {displayResult || randomNumber}
        </motion.div>

        {displayResult && (
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 1 }}
                    className="w-full flex flex-col items-center space-y-4 pt-8 justify-center">
                        {id === result && ( <Button value="Resgatar prêmio" onClick={() => {setShowRules(true)}}/> )}
                        <Button value="Fechar" onClick={closeModal}/>
                    </motion.div>
        )}
      </motion.div>
    </ModalContainer>
  )
}
