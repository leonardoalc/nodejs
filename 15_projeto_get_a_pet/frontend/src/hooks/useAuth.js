// API
import api from "../utils/api"

import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import useFlashMessage from "./useFlashMessage"

export default function useAuth() {

    const [authenticated, setauthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()

    let msgTxt = "Cadastro realizado com sucesso"
    let msgType = "success"

    const navigate = useNavigate()

    // enviando em todas as requisições o token
    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }
    }, [])
    

    async function register(user) {



        try {
            const data = await api.post("/users/register", user)
                .then((response) => {return response})

            await authUser(data)
        } catch (error) {
            msgTxt = error.response.data.message
            msgType = "error"
        }

        setFlashMessage(msgTxt, msgType)

    }

    async function authUser(data) {

        setauthenticated(true)


        localStorage.setItem("token", JSON.stringify(data.data.token))

        navigate("/")

    }

    function logout() {

        const msgTxt = "Logout realizado com sucesso!"
        const msgType = "success"

        setauthenticated(false)
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = undefined
        navigate("/")

        setFlashMessage(msgTxt, msgType)
    }

    return { authenticated, register, logout}
}