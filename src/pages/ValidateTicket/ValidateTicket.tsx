import { FaArrowLeft } from "react-icons/fa6";
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { exequery, IExequery } from "../../services/api";
import { SignUpContext } from "../../contexts/SignInContext";
import ConfirmModal, { IConfirmModalProps } from "../../components/modal/ConfirmModal/ConfirmModal";

export default function ValidateTicket(){

    const navigate = useNavigate()
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalProps, setModalProps] = useState<IConfirmModalProps>({closeModal: () => {}, isOpen: false, title: '', type:'confirm', auxFunction: () => {}, message:'', onConfirm: () => {}, textButton: '', closeButton: false, autoClose: false, closeTime: 0})
    const {token} = useContext(SignUpContext)

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" } 
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

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    const scanQRCode = async () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")

            if (ctx) {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                const code = jsQR(imageData.data, imageData.width, imageData.height)

                if (code && code.data) {
                    stopCamera()

                    if(code.data.includes('TICKET')){
                        const body = {
                            ticket_number:code.data
                        }
                        
                        const query : IExequery = {
                            isPublic: false,
                            method:'post',
                            route:'/validate-ticket',
                            token:token,
                            body:body,
                        }
    
                        try{
                            const data = await exequery(query)
                            if(data.message === 'Ingresso marcado como utilizado com sucesso!'){
                                const modalProps : IConfirmModalProps = {
                                    closeModal: () => {setShowModal(false)},
                                    isOpen: true,
                                    title: 'ingresso Validado!',
                                    type: 'confirm',
                                    message: `Ingresso Validado com sucesso!`,
                                    onConfirm: () => {
                                        setShowModal(false)
                                        startCamera()
                                    },
                                    auxFunction:() => {
                                        setShowModal(false)
                                        startCamera()
                                    },               
                                    autoClose: true,
                                    closeTime: 1000,
                                }
                                setModalProps({...modalProps})
                                setShowModal(true)
                                console.log(data)
                                return
                            }
                        }catch(error){
                            const modalProps : IConfirmModalProps = {
                                closeModal: () => {setShowModal(false)},
                                isOpen: true,
                                title: 'Ingresso Inválido',
                                type: 'error',
                                message: `${error}`,
                                onConfirm: () => {
                                    setShowModal(false)
                                    startCamera()
                                },
                                auxFunction:() => {
                                    setShowModal(false)
                                    startCamera()
                                },
                                autoClose: true,
                                closeTime: 1000,
                            }
                            setModalProps({...modalProps})
                            setShowModal(true)
    
                        } finally {
                            return
                        }
                    }
                    
                    try{

                        const body = {
                            unique_number:code.data,
    
                        }

                        await validateTicket(body.unique_number)
                    }catch(error: any){
                        const modalProps : IConfirmModalProps = {
                            closeModal: () => {setShowModal(false)},
                            isOpen: true,
                            title: 'Ingresso Inválido',
                            type: 'error',
                            message:  `${error.message}`,
                            onConfirm: () => {
                                setShowModal(false)
                                startCamera()
                            },
                            auxFunction:() => {
                                setShowModal(false)
                                startCamera()
                            },
                            autoClose: true,
                            closeTime: 1000,
                        }
                        setModalProps({...modalProps})
                        setShowModal(true)

                    } finally {
                        return
                    }
                    


                }
            }
        }
    };

    const validateTicket = async (unique_number: string) => {

        const body = {
            unique_number: unique_number
        }

        try {
                const query : IExequery = {
                    isPublic: true, 
                    method: 'post', 
                    route:'/validate-entry-ticket', 
                    token: '', 
                    body: body
                }

                const data = await exequery(query)

                if(data.message === 'Ingresso marcado como utilizado com sucesso!'){
                    const modalProps : IConfirmModalProps = {
                        closeModal: () => {setShowModal(false)},
                        isOpen: true,
                        title: 'ingresso Validado',
                        type: 'confirm',
                        message: `Ingresso Validado com sucesso!`,
                        onConfirm: () => {
                            setShowModal(false)
                            startCamera()
                        },
                        auxFunction:() => {
                            setShowModal(false)
                            startCamera()
                        },
                        autoClose: true,
                        closeTime: 1000,
                    }
                    setModalProps({...modalProps})
                    setShowModal(true)
                    console.log(data)
                    return
                }
        } catch (error) {   
            throw error
        }
    }

    useEffect(() => {
        const startCameraAndScan = async () => {
            await startCamera()
            const interval = setInterval(() => {
                scanQRCode()
                console.log('oi')
            }, 1000)
    
            return () => {
                clearInterval(interval);
                stopCamera()
            }
        }
    
        startCameraAndScan()
    
    }, [])

    return(
        <div className="flex flex-col min-h-[100vh] w-full">
            <ConfirmModal
            isOpen={showModal}
            closeModal={() => {
                setShowModal(false)
                startCamera()
            }}
            title={modalProps.title}
            type={modalProps.type}
            auxFunction={() => {
                setShowModal(false)
                startCamera()
            }}
            onConfirm={modalProps.onConfirm} 
            message={modalProps.message}
            closeButton={modalProps.closeButton}
            textButton={modalProps.textButton}
            autoClose={modalProps.autoClose}
            closeTime={modalProps.closeTime}
            />
            <div className="p-2 px-4 border-b font-[600] shadow-md">
                Validar Ingresso
            </div>
            <div className="flex flex-col p-4">
                <div className="w-full flex justify-center items-center pt-10">
                    <div className="w-full relative rounded-md h-[50vh] lg:h-[70vh] flex justify-center items-center">
                    <video
                        ref={videoRef}
                        autoPlay={true}
                        playsInline={true}
                        muted={true}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    </div>
                    <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480}></canvas>
                </div>
 
            </div>
        </div>
    )
}