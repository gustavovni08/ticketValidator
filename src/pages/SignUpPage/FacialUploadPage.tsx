import React, { useRef, useState } from "react"
import { useEffect } from "react"
import Button from "../../components/buttons/Button"
import { useNavigate, useParams } from "react-router-dom"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { FaArrowLeft } from "react-icons/fa6"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { motion } from "framer-motion"

export default function FacialUploadPage(){

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageBase64, setImageBase64] = useState<string | null>(null)
   

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {navigate('/SignUp')},
            row: true,
        },
    ] 

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        })
    }

    useEffect(() => {
        scrollToTop() 

        document.addEventListener("visibilitychange", scrollToTop)

        return () => {
          document.removeEventListener("visibilitychange", scrollToTop)
        }

    }, [])

        function handleChooseFile() {
            if (fileInputRef.current) {
                fileInputRef.current.click() 
            }
        }

        function facialCaptureRouter(){
            navigate('/facialCapture')
        }

        function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
            const file = event.target.files?.[0]
            if (file) {
              
                const reader = new FileReader()
                reader.onloadend = () => {
                    if (reader.result) {
                        setImageBase64(reader.result as string) 
                        setImageFile(file) 
                    }
                }
                reader.readAsDataURL(file) 
            }
        }
     
    return(
        <>
            <motion.div 
            initial={{ opacity: 0, y: 100}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, x: 100}}
            transition={{ duration: 0.5 }}
            className="w-full min-h-[100vh] flex flex-col items-center space-y-6 pt-10 pb-10">
          
            <div className="w-4/5 flex items-center">
                <FloatingMenu items={buttons}/>
            </div>
          
          
                 <div className="w-full flex items-center justify-center font-bold">
                    <div>
                        Cadastro de facial
                    </div>
                </div>
                {!imageFile && (
                    <>
                        <Button value="Tirar Foto" onClick={facialCaptureRouter}/>
                        {/* <Button value="Escolher do Dispositivo" fontSize="text-md" onClick={handleChooseFile}/>     */}
                    </>
                )}
                
                
                <input type="file" onChange={handleFileChange}  ref={fileInputRef} accept="image/*" style={{display: "none"}}/>
                {imageFile && (
                    <>
                        <div className="mt-5 flex justify-center">
                            
                            {imageBase64 ? (
                                <img 
                                    src={imageBase64} 
                                    alt="Imagem selecionada" 
                                    className="w-32 h-32 object-cover rounded-full" 
                                />
                            ) : (
                                <p>Carregando imagem...</p> 
                            )}
                        </div>

                        <Button value="Escolher outra foto" onClick={handleChooseFile} />
                        <Button value="Próximo" />
                    </>
                )}
            </motion.div>
        </>
    )
}