// hooks
import {useState, useContext} from "react"
import {Link} from "react-router-dom"

// components
import Input from "../../form/Input"

// css
import styles from "../../form/Form.module.css"

// context
import { Context } from "../../../context/UserContext"

const Login = () => {

  const [user, setuser] = useState({})
  const {login} = useContext(Context)

  const handleChange = (e) => {
    setuser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    login(user)
  }

  return (
    <div className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input text="E-mail" type="email" name="email" placeholder="Digite seu email" handleOnChange={handleChange}/>
        <Input text="Senha" type="password" name="password" placeholder="Digite sua senha" handleOnChange={handleChange}/>
        <input type="submit" value="Entrar"/>
      </form>
      <p>Não tem conta? <Link to="/register">Clique aqui!</Link></p>
    </div>
  )
}
export default Login