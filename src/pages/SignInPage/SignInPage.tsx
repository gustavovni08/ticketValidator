
import { useContext, useState } from "react";
import Button from "../../components/buttons/Button";
import TextInput from "../../components/inputs/TextInput";
import { useNavigate } from "react-router-dom";
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton";
import { FaArrowLeft } from "react-icons/fa6";
import { useActiveButton } from "../../components/global/footer/context/ActiveButtonContext";
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu";
import { IUser, SignUpContext } from "../../contexts/SignInContext";


export default function SignInPage(){

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {setActiveButton} = useActiveButton()
    const navigate = useNavigate()

    const{setUser} = useContext(SignUpContext)

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            path: '/',
            onClick: () => {setActiveButton('Home')},
            row: true,
        },
    ] 

    function handleLogin(){
        const user : IUser = {
            nome:'Vinicius Gustavo Costa Leite',
            CEP: '',
            cidade: '',
            complemento: '',
            CPF: '',
            email: '',
            endereco: '',
            numeroEndereco:'',
            senha:'',
            telefone:'',
            UF:''
        }

        setUser(user)
        navigate(-1)
    }

    return(
        <>
            <div className="flex flex-col bg-gray-200 w-full min-h-[100vh] items-center">

            <div className="w-4/5 flex items-center justify-center m-2">
                <FloatingMenu items={buttons}/>
            </div>

            <div className="min-h-[80vh] w-full flex justify-center items-center">
                
                <div className="flex justify-center min-h-[40vh] bg-white p-4 shadow-md rounded-md pb-10 items-center w-[90%] flex-col">

                    <div className="w-full flex items-center justify-center m-2">
                        <TextInput type="number" label="Digite seu Email" value={login} onChange={(event) => {setLogin(event.target.value)}}/>
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

                    <div className="w-full flex flex-col items-center justify-center m-2">
                        <div className="m-1 mb-3">
                            <p className="text-sm font-[600]">Não tenho Cadastro.</p>
                        </div>
                        <Button value="Cadastre-se" onClick={() => {navigate('/SignUp')}}/>
                    </div>

                </div>

            </div>


            </div>
        </>
        
    )
}