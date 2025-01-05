import React, { useContext } from "react"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { useState, useEffect } from "react"
import Button from "../../components/buttons/Button"
import TextInput from "../../components/inputs/TextInput"
import { useNavigate } from "react-router-dom"
import { IUser, SignUpContext } from "../../contexts/SignInContext"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { FaArrowLeft } from "react-icons/fa6"
import { motion } from "framer-motion"
import { api } from "../../services/api"

export default  function GuardianSignUpPage(){
    
    const [CPF, setCPF] =  useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [telphone, setTelPhone] = useState<string>('')
    const [CEP, setCEP] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [UF, setUF] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [addressNumber, setAddressNumber] = useState<string>('')
    const [complement, setComplement] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')
    const [readonly, setReadonly] = useState<boolean>(false)
    const [emptyFields, setEmptyFields] = useState<string[]>([])
    const [step, setStep] = useState<number>(1)

    const {setUser, setToken} = useContext(SignUpContext)

    const navigate = useNavigate()

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        })
    }

    function validarCPF(cpf: string) {
        
        cpf = cpf.replace(/[^\d]+/g, '')
      
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
          return false
        }
      
       
        let soma = 0
        let peso = 10
        for (let i = 0 ;i < 9 ;i++) {
          soma += parseInt(cpf[i]) * peso--
        }
        let resto = soma % 11
        let digito1 = resto < 2 ? 0 : 11 - resto
        
        
        soma = 0
        peso = 11
        for (let i = 0 ; i < 10; i++) {
          soma += parseInt(cpf[i]) * peso--
        }
        resto = soma % 11
        let digito2 = resto < 2 ? 0 : 11 - resto
      
        
        return parseInt(cpf[9]) == digito1 && parseInt(cpf[10]) === digito2
    }

    function validarSenha(senha: string) {
        if(senha.length < 8){
            return false
        }

        if(!/[a-z]/.test(senha)){
            return false
        }

        if(!/[A-Z]/.test(senha)){
            return false
        }

        if(!/[^a-zA-Z0-9]/.test(senha)){
            return false
        }

        return true
    }
      
    const validarCEP = async (cep: string) => {
        if (cep.length === 9) {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json()
            if (data.erro) {
              window.alert('CEP não encontrado!')
            } else { 
              setAddress(data.logradouro)
              setCity(data.localidade)
              setUF(data.uf)
              setReadonly(true)
            }
          } catch (error) {
            window.alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
          }
          return
        }

        if(cep.length !== 8) {
            setAddress('')
            setCity('')
            setUF('')
            setReadonly(false)
            return
        }
    }

    function validarDataNascimento(isoDate: string){
        
        const selectedDate = new Date(isoDate)
        const currentDate = new Date()
        
        if(currentDate.getFullYear() - selectedDate.getFullYear() < 18){
            return false
        }
        
        if(currentDate.getFullYear() - selectedDate.getFullYear() >= 18){
            return true
        }

    }

    const validateData = async () => {

        const requiredFields = { CPF, password, name, telphone, email, };
        const emptyFields = Object.keys(requiredFields).filter(key => !requiredFields[key as keyof typeof requiredFields]);
    
        if (emptyFields.length > 0) {
          setEmptyFields(emptyFields)
          window.alert("Insira todos os Dados")
          scrollToTop()
          return
        }
    
        setEmptyFields([])


        const validacaoCPF = validarCPF(CPF)

        if(!validacaoCPF){
            window.alert('CPF inválido')
            setEmptyFields(['CPF'])
            scrollToTop()
            return
        }

        // const validacaoSenha = validarSenha(password)

        // if(!validacaoSenha){
        //     window.alert('A senha deve ao menos conter 8 caractéres, uma letra maiúscula e uma letra minúscula.')
        //     setEmptyFields(['password'])
        //     scrollToTop()
        //     return
        // }

        // const validacaoCEP = validarCEP(CEP)

        // if(!validacaoCEP){
        //     window.alert('CEP Inválido')
        //     setEmptyFields(['CEP'])
        //     scrollToTop()
        //     return
        // }

        try {

            const user : IUser =  {
                id:0,
                // CEP: CEP, 
                // cidade: city,
                // complemento: complement,
                document: CPF,
                email: email,
                // endereco: address,
                name: name,
                role:'CUSTOMER',
                // numeroEndereco: addressNumber,
                senha: password,
                contato: telphone,
                image_user_base64: 'img',
                // UF: UF,
            }

            setUser(user)
            const {data} = await api.post('/register', user)
            console.log(data)
            setToken(data.access_token)
            navigate('/FacialUpload')

            
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
        scrollToTop() 

        document.addEventListener("visibilitychange", scrollToTop);

        return () => {
          document.removeEventListener("visibilitychange", scrollToTop)
        }

    }, [])

    useEffect(() => {
        validarCEP(CEP)
    }, [CEP])

    const buttons : IFloatingButtonProps[] = [
        {
            icon: <FaArrowLeft/>,
            label:'',
            onClick: () => {
                if(step === 2){
                    setStep(1)
                    scrollToTop()
                    return
                }

                navigate('/')
            },
            row: true,
        },
    ] 

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

            <div className="w-full flex items-center flex-col justify-center font-bold">
                    <div className="w-4/5">
                        Criar Conta
                    </div>
                    {/* <div className="w-4/5 text-[0.8rem] font-[400]">
                        Passo {step} de 2.
                    </div> */}
                </div>

                    <>
                    
                        <TextInput 
                        label="Digite seu Nome" 
                        value={name} 
                        placeholder="Digite seu Nome"
                        required={true}
                        isError={emptyFields.includes("name")}
                        onChange={(event) => {setName(event.target.value)}}/>

                        <TextInput 
                        label="Digite seu CPF" 
                        value={CPF}
                        placeholder="999.999.999-99"
                        mask="999.999.999-99"
                        required={true} 
                        isError={emptyFields.includes("CPF")}
                        onChange={(event) => {setCPF(event.target.value)}}/>

                        <TextInput 
                        label="Digite sua Data de Nascimento" 
                        value={birthDate} 
                        required={true}
                        type="date" 
                        isError={emptyFields.includes("birthDate")}
                        onChange={(event) => {setBirthDate(event.target.value)}}/>

                        <TextInput 
                        label="Digite sua Senha" 
                        placeholder="Digite sua Senha"
                        required={true}
                        value={password} 
                        type="password"
                        isError={emptyFields.includes("password")}
                        onChange={(event) => {setPassword(event.target.value)}}/>

                        <TextInput 
                        label="Digite seu Email"
                        type="email"
                        placeholder="Digite seu Email" 
                        required={true}
                        value={email} 
                        isError={emptyFields.includes("email")}
                        onChange={(event) => {setEmail(event.target.value.toLocaleLowerCase())}}/>

                        <TextInput 
                        label="Digite seu Telefone" 
                        value={telphone}    
                        required={true}
                        placeholder="(99) 99999-9999"
                        mask="(99) 99999-9999"
                        type="tel" 
                        isError={emptyFields.includes("telphone")}
                        onChange={(event) => {setTelPhone(event.target.value)}}/>
                        
                        <Button 
                        value="Próximo"
                        disabled={!name || !password || !CPF || !birthDate}
                        onClick={() => {

                            validateData()
                            // const validacaoCPF = validarCPF(CPF)
                            // const validacaoDataNascimento = validarDataNascimento(birthDate)

                            // if(!validacaoCPF){
                            //     window.alert('CPF inválido')
                            //     setEmptyFields(['CPF'])
                            //     scrollToTop()
                            //     return
                            // }

                            // if(!validacaoDataNascimento){
                            //     window.alert('O responsável deve ter maior de 18 anos')
                            //     setEmptyFields(['birthDate'])
                            //     scrollToTop()
                            //     return
                            // }

                            scrollToTop()

                        }}
                        />
                        

                    </>

                {step === 2 && (
                    <>
                        <TextInput 
                        label="Insira o CEP" 
                        required={true}
                        value={CEP} 
                        mask="99999-999"
                        placeholder="99999-999"
                        isError={emptyFields.includes("CEP")}
                        onChange={(event) => {setCEP(event.target.value)}}/>

                        <TextInput 
                        label="Insira o Endereço"
                        placeholder="Insira o Endereço" 
                        required={true}
                        value={address} 
                        readonly={readonly}
                        isError={emptyFields.includes("address")}
                        onChange={(event) => {setAddress(event.target.value)}}/>

                        <TextInput 
                        label="Insira a UF do Endereço" 
                        placeholder="Insira a UF"
                        required={true}
                        value={UF} 
                        readonly={readonly}
                        isError={emptyFields.includes("UF")}
                        onChange={(event) => {setUF(event.target.value)}}/>


                        <TextInput 
                        label="Insira a Cidade do Endereço" 
                        placeholder="Insira a cidade"
                        readonly={readonly}
                        required={true}
                        value={city} 
                        isError={emptyFields.includes("city")}
                        onChange={(event) => {setCity(event.target.value)}}/>

                        <TextInput
                        placeholder="Número do Endereço" 
                        label="Insira o número de Endereço" 
                        required={true}
                        value={addressNumber} 
                        isError={emptyFields.includes("addressNumber")}
                        onChange={(event) => {setAddressNumber(event.target.value)}}/>

                        <TextInput 
                        label="Insira um Complemento de Endereço"
                        placeholder="Complemento de Endereço"
                        value={complement} 
                        onChange={(event) => {setComplement(event.target.value)}}/>

                        <Button 
                        value="Proximo"
                        type="submit"
                        disabled={!CEP || !address || !addressNumber || !UF || !city} 
                        onClick={validateData}/>

                        
                    </>
                )}

            </motion.div>
        </>
    )
}

