import {useContext, useState} from "react"

import Input from "../../form/Input"

import styles from "../../form/Form.module.css"

import { Context } from "../../../context/UserContext"

const Register = () => {

  const [user, setuser] = useState({})
  const {register} = useContext(Context)
  const handleChange = (e) => {
    setuser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    register(user)
  }

  return (
    <div className={styles.form_container}>
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit}>
          <Input
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            handleOnChange={handleChange}
          />
          <Input
            text="Telefone"
            type="text"
            name="phone"
            placeholder="Digite seu telefone"
            handleOnChange={handleChange}
          />
          <Input
            text="Email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            handleOnChange={handleChange}
          />
          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            handleOnChange={handleChange}
          />
          <Input
            text="Confirmação de Senha"
            type="password"
            name="confirmpassword"
            placeholder="Confirme sua senha"
            handleOnChange={handleChange}
          />
          <input type="submit" value="Cadastrar" />
        </form>
    </div>
  )
}
export default Register