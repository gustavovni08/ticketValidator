import axios from "axios";

export const api = axios.create({
    baseURL : "https://eventos.nuxtsoft.com.br/api"
    // baseURL : "http://127.0.0.1:8000/api"
})

export interface IExequery {
    method: 'get' | 'post' | 'delete' | 'put'
    route: string
    token: string
    isPublic: boolean
    body?: any
}

export async function exequery({method, route, token, isPublic, body} : IExequery){

    try {

        if(method === 'get' && !isPublic){
            const {data} = await api.get(route, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return data
        }

        if(method === 'get' && isPublic) {
            const {data} = await api.get(route)
            return data
        }

        if(method === 'post' && !isPublic){
            const {data} = await api.post(route, body, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return data
        }

        if(method === 'post' && isPublic){
            const {data} = await api.post(route, body)
            return data
        }

        if(method === 'delete' &&  !isPublic){
            const {data} = await api.delete(route, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return data
        }

        if(method === 'delete' && isPublic){
            const {data} = await api.delete(route)
            return data
        }

        if(method == 'put' && !isPublic){
            const {data} = await api.put(route, body, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return data
        }

        if(method == 'put' && isPublic){
            const {data} = await api.put(route, body)
            return data
        }

    } catch (error) {
        throw error
    }

}