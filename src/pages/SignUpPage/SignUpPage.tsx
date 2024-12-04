import React, { useContext } from "react"
import FloatingMenu from "../../components/global/floatingMenu/FloatingMenu"
import { useState, useEffect } from "react"
import Button from "../../components/buttons/Button"
import TextInput from "../../components/inputs/TextInput"
import { useNavigate } from "react-router-dom"
import { IUser, SignUpContext } from "../../contexts/SignInContext"
import { IFloatingButtonProps } from "../../components/global/floatingMenu/components/FloatingButton"
import { FaArrowLeft } from "react-icons/fa6"

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

    const {user, setUser} = useContext(SignUpContext)

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

    function validateData(){

        const requiredFields = { CPF, password, name, telphone, CEP, address, addressNumber, email, birthDate, UF, city };
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

        const validacaoCEP = validarCEP(CEP)

        if(!validacaoCEP){
            window.alert('CEP Inválido')
            setEmptyFields(['CEP'])
            scrollToTop()
            return
        }


        const user : IUser =  {
            CEP: CEP, 
            cidade: city,
            complemento: complement,
            CPF: CPF,
            email: email,
            endereco: address,
            nome: name,
            numeroEndereco: addressNumber,
            senha: password,
            telefone: telphone,
            UF: UF,
        }

        
        setUser(user)

        navigate('/FacialUpload')
        
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
            path: '/',
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
            <div className="w-full min-h-[100vh] flex flex-col items-center space-y-6 pt-10 pb-10">

            <div className="w-4/5 flex items-center">

                <FloatingMenu items={buttons}/>

            </div>

            <div className="w-full flex items-center flex-col justify-center font-bold">
                    <div className="w-4/5">
                        Criar Conta
                    </div>
                    <div className="w-4/5 text-[0.8rem] font-[400]">
                        Passo {step} de 2.
                    </div>
                </div>

                {step === 1 && (

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
                        disabled={!name || !CPF || !birthDate}
                        onClick={() => {

                            const validacaoCPF = validarCPF(CPF)
                            const validacaoDataNascimento = validarDataNascimento(birthDate)

                            if(!validacaoCPF){
                                window.alert('CPF inválido')
                                setEmptyFields(['CPF'])
                                scrollToTop()
                                return
                            }

                            if(!validacaoDataNascimento){
                                window.alert('O responsável deve ter maior de 18 anos')
                                setEmptyFields(['birthDate'])
                                scrollToTop()
                                return
                            }

                            setStep(2)
                            scrollToTop()

                        }}
                        />
                        

                    </>

                )}

                {step === 2 && (
                    <>
                        <TextInput 
                        label="Insira o CEP do Responsável" 
                        required={true}
                        value={CEP} 
                        mask="99999-999"
                        placeholder="99999-999"
                        isError={emptyFields.includes("CEP")}
                        onChange={(event) => {setCEP(event.target.value)}}/>

                        <TextInput 
                        label="Insira o Endereço do Responsável"
                        placeholder="Endereço do Responsável" 
                        required={true}
                        value={address} 
                        readonly={readonly}
                        isError={emptyFields.includes("address")}
                        onChange={(event) => {setAddress(event.target.value)}}/>

                        <TextInput 
                        label="Insira a UF do Endereço do Responsável" 
                        placeholder="UF do Endereço do Responsável"
                        required={true}
                        value={UF} 
                        readonly={readonly}
                        isError={emptyFields.includes("UF")}
                        onChange={(event) => {setUF(event.target.value)}}/>


                        <TextInput 
                        label="Insira a Cidade do Endereço do Responsável" 
                        placeholder="Endereço do Responsável"
                        readonly={readonly}
                        required={true}
                        value={city} 
                        isError={emptyFields.includes("city")}
                        onChange={(event) => {setCity(event.target.value)}}/>

                        <TextInput
                        placeholder="Endereço do Responsável" 
                        label="Insira o número de Endereço do Responsável" 
                        required={true}
                        value={addressNumber} 
                        isError={emptyFields.includes("addressNumber")}
                        onChange={(event) => {setAddressNumber(event.target.value)}}/>

                        <TextInput 
                        label="Insira um Complemento de Endereço do Responsável"
                        placeholder="Complemento de Endereço do Responsável"
                        value={complement} 
                        onChange={(event) => {setComplement(event.target.value)}}/>

                        <Button 
                        value="Proximo"
                        type="submit"
                        disabled={!CEP || !address || !addressNumber || !UF || !city} 
                        onClick={validateData}/>

                        
                    </>
                )}

            </div>
        </>
    )
}

