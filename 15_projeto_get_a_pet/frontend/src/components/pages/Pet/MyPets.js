import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

const MyPets = () => {

  const [pets, setpets] = useState([])


  return (
    <div>
      <h1>MyPets</h1>
      <Link to="/pet/add">Cadastrar pet</Link>
      <div>
        {pets.length > 0 &&  <p>Meus pets</p>}
        {pets.length === 0 && <p>Não há pets cadastrados!</p>}
      </div>
    </div>
  )
}
export default MyPets