
import { useCallback, useContext, useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import TextInput from "../../components/inputs/TextInput";
import { useNavigate } from "react-router-dom";
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton";
import { FaArrowLeft } from "react-icons/fa6";
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext";
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu";
import { IUser, SignUpContext } from "../../contexts/SignInContext";
import {motion} from "framer-motion"
import { api } from "../../services/api";
import { IConfirmModalProps } from "../../components/modal/ConfirmModal/ConfirmModal";
import ConfirmModal from "../../components/modal/ConfirmModal/ConfirmModal";


export default function SignInPage(){

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalProps, setModalProps] = useState<IConfirmModalProps>({closeModal: () => {}, isOpen: false, title: '', type:'confirm', auxFunction: () => {}, message:'', onConfirm: () => {}, textButton: '', closeButton: false, autoClose: false, closeTime: 0})
    const {setActiveButton} = useActiveButton()
    const navigate = useNavigate()

    const{setUser, setToken} = useContext(SignUpContext)

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {setActiveButton('Home')},
            row: true,
        },
    ] 


    const handleLogin = async () => {

        try {

            const body = { email: login, password: password,}
            const {data} = await api.post('/loginapi', body)
            setToken(data.access_token)
            localStorage.setItem('token', data.access_token)
            console.log(data)

            
            const user : IUser = {
                id: data.user.id,
                name: data.user.name,
                document: data.user.document,
                role:data.user.role,
                email: data.user.email,
                senha: '',
                contato:'',
            }

            const modalProps : IConfirmModalProps = {
                closeModal: () => {
                    setUser(user)
                    navigate('/ValidateTicket')
                    setShowModal(false)
                },
                isOpen: true,
                title: 'Login feito com sucesso!',
                type: 'confirm',
                message: `Login feito com sucesso!`,
                onConfirm: () => {
                    setUser(user)
                    navigate('/ValidateTicket')
                },
                autoClose: true,
                closeTime: 1000,
            }
            setModalProps({...modalProps})
            setShowModal(true)



        } catch (error) {
            const modalProps : IConfirmModalProps = {
                closeModal: () => {setShowModal(false)},
                isOpen: true,
                title: 'Ops, ocorreu algum erro...',
                type: 'error',
                message: `${error}`,
                autoClose: true,
                closeTime: 1000,
            }
            setModalProps({...modalProps})
            setShowModal(true)
        }


    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            navigate('/ValidateTicket')
        }

    }, [])

    // console.log(modalProps)

    return(
        <>
            <ConfirmModal
            closeModal={() => {modalProps?.closeModal?.()}}
            isOpen={showModal}
            title={modalProps?.title || ''}
            type={modalProps?.type || 'confirm'}
            message={modalProps?.message || ''}
            onConfirm={modalProps?.onConfirm}
            textButton={modalProps?.textButton}
            closeButton={modalProps.closeButton}
            autoClose={modalProps.autoClose}
            closeTime={modalProps.closeTime}
            // auxFunction={modalProps?.auxFunction}
            />
            <div className="bg-gray-200">
            <div 
            className="flex flex-col bg-gray-200 w-full min-h-[100vh] justify-center items-center"
            style={{ backgroundImage: `url(${'https://cdn.vectorstock.com/i/500p/88/95/hexagonal-pattern-on-green-magma-background-vector-32238895.avif'})` }}>

            {/* <div className="w-4/5 flex items-center justify-center m-2">
                <FloatingMenu items={buttons}/>
            </div> */}

            <motion.div 
            initial={{ opacity: 0, y: 100}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, x: 100}}
            transition={{ duration: 0.5 }}
            className="min-h-[80vh] w-full md:w-3/5 lg:w-2/5 xl:w-[31%] flex flex-col justify-center items-center">

                <div className="flex w-full items-center justify-center p-4">
                    <img src="https://api-eventos.pacsafe.com.br/logo-branca-1024x500.png" alt="logo" className="w-[200px] h-[80px]"/>
                </div>
                
                <div className="flex justify-center min-h-[40vh] bg-white p-4 shadow-md rounded-md pb-10 items-center w-[90%] flex-col">

                    <div className="w-full flex items-center justify-center m-2">
                        <TextInput label="Digite seu Email" value={login} onChange={(event) => {   setLogin(event.target.value)}}/>
                    </div>


                    <div className="w-full flex flex-col items-center justify-center m-2">
                        <TextInput type="password" label="Digite sua Senha" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                        <div className="w-4/5 m-2">
                            <div className="text-[0.8rem] text-blue-900 hover:underline cursor-pointer">Esqueci a Senha.</div>
                        </div>
                    </div>

                    <div className="w-full border-b pb-10 flex items-center justify-center m-2">
                        <Button value="Entrar" onClick={handleLogin}/>
                    </div>

                    {/* <div className="w-full flex flex-col items-center justify-center m-2">
                        <div className="m-1 mb-3">
                            <p className="text-sm font-[600]">Não tenho Cadastro.</p>
                        </div>
                        <Button value="Cadastre-se" onClick={() => {navigate('/SignUp')}}/>
                    </div> */}

                </div>

            </motion.div>


            </div>
            </div>
        </>

        
    )
}