import React, { useRef, useState, useEffect, useContext } from "react"
import Button from "../../components/buttons/Button"
import { SignUpContext } from "../../contexts/SignInContext"
import { useNavigate } from "react-router-dom"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { FaArrowLeft } from "react-icons/fa6"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { motion } from "framer-motion"

export default function FacialCapturePage() {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)

    const {setUserPhotoBase64} = useContext(SignUpContext)
    const navigate = useNavigate()


    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {navigate('/FacialUpload')},
            row: true,
        },
    ] 

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" } 
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (error: any) {
            if (error.name === 'NotReadableError') {
                window.alert("Erro: Câmera já está em uso por outra aplicação.")
            } else {
                window.alert("Erro ao acessar a câmera: " + error)
            }
        }
    }

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext("2d")
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
                const imageUrl = canvasRef.current.toDataURL("image/png")
                setCapturedImage(imageUrl)
            }
        }
    }

    function setData(){

        if(capturedImage){
            
            setUserPhotoBase64(capturedImage)
            console.log(capturedImage)
            navigate('/')

        }

    }


    useEffect(() => {
        if (!capturedImage) {
            startCamera()
        }
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream
                const tracks = stream.getTracks()
                tracks.forEach(track => track.stop())
            }
        }
    }, [capturedImage])

    return (
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

                {!capturedImage ? (
                    <>
                        <div className="relative w-4/5 md:w-3/5 lg:w-2/5 rounded-md h-[50vh] lg:h-[70vh] flex justify-center items-center">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480}></canvas>
                        <Button value="Tirar Foto" onClick={capturePhoto} />
                    </>
                ) : (
                    <>
                        <img src={capturedImage} alt="Imagem Capturada" className="w-32 h-32 object-cover rounded-full" />
                        <Button value="Enviar" onClick={setData} />
                        <Button value="Tirar outra Foto" onClick={() => setCapturedImage(null)} />
                    </>
                )}
            </motion.div>
        </>
    )
}
