import React, { createContext, useState } from "react";

export interface IUser {
    id: number
    name: string
    document: string
    senha: string
    email: string
    contato: string
    role: string
    image_user_base64?: string
    // CEP: string
    // UF: string
    // cidade: string
    // endereco: string
    // numeroEndereco: string
    // complemento: string

}

interface ISignUpContextProps {
    user: IUser | null
    setUser: (user: IUser | null) => void
    userPhotoBase64: string
    setUserPhotoBase64: (b64photo: string) => void
    token: string,
    setToken: (token: string) => void
}

interface IStudentSignUpContextProvider {
    children: JSX.Element
}

const defaultValues : ISignUpContextProps = {
    user: null,
    setUser: (user: IUser | null) => {},
    userPhotoBase64: '',
    setUserPhotoBase64: (b64photo: string) => {},
    token: '',
    setToken: () => {}
}

export const SignUpContext = createContext(defaultValues)

export function SignUpContextProvider({children} : IStudentSignUpContextProvider){
    
    const [user, setUser] = useState<IUser | null>(null)
    const [userPhotoBase64, setUserPhotoBase64] = useState<string>('')
    const [token, setToken] = useState<string>('')

    return(
        <SignUpContext.Provider value={{user, setUser, userPhotoBase64, setUserPhotoBase64, token, setToken}}>
            {children}
        </SignUpContext.Provider>
    )
} 