// css
import styles from "./Profile.module.css"
import formStyles from  "../../form/Form.module.css"

// hooks
import { useState, useEffect } from "react"

// components
import Input from "../../form/Input"
import RoundedImage from "../../layout/RoundedImage"

// auth
import api from "../../../utils/api"

// flash messages
import useFlashMessage from "../../../hooks/useFlashMessage"


const Profile = () => {

  const [user, setuser] = useState({})
  const [preview, setpreview] = useState()
  const [token] = useState(localStorage.getItem("token") || "")
  const {setFlashMessage} = useFlashMessage() 

  useEffect(() => {

    api.get("/users/checkuser", {
      headers: {Authorization: `Bearer ${JSON.parse(token)}`}
    })
      .then((response) => {setuser(response.data)})

  }, [])

  const onFileChange = (e) => {
    setpreview(e.target.files[0])
    setuser({...user, [e.target.name]: e.target.files[0]})
  } 

  const handleChange = (e) => {
    setuser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let msgType = "success"

    const formData = new FormData()

    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key])
    })

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {Authorization: `Bearer ${JSON.parse(token)}`},
      'Content-Type': "multipart/form-data"
    })
      .then((response) => {
        return response.data
      }).catch((err) => {
        msgType = "error"
        return err.response.data
      })

      setFlashMessage(data.message, msgType)
      setTimeout(() => {
        
      }, 2000);
  }
  
  return (
    <div>
      <div className={styles.profile_container}>
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}images/users/${user.image}`}
          alt={user.name}
          />)}
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Celular"
          type="text"
          name="phone"
          placeholder="Digite seu número de celular"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmPassword"
          placeholder="confirme sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  )
}
export default Profile