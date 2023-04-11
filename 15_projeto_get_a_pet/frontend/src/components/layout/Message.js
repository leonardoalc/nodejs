import styles from "./Message.module.css"

import { useState, useEffect } from "react"

import bus from "../../utils/bus"

const Message = () => {
  
  const [visibility, setvisibility] = useState(false)
  const [message, setmessage] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {

    bus.addListener("flash", ({message, type}) => {

      setvisibility(true)
      setmessage(message)
      setType(type)

      setTimeout(() => {
        setvisibility(false)
      }, 3500)
    })

  }, [])

  return (
    visibility && (<div className={`${styles.message} ${styles[type]}`}>
      {message}
    </div>)
  )
}
export default Message