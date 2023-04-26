import { Link } from "react-router-dom"
import { useContext } from "react"

import styles from "./Navbar.module.css"
import Logo from "../../assets/img/logo.png"

import { Context } from "../../context/UserContext"

const Navbar = () => {

  const {authenticated, logout} = useContext(Context)
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get a Pet"/>
        <h2>Get a Pet</h2>
      </div>
      <ul >
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? 
          (<>
            <li><Link to="/user/profile">Perfil</Link></li>
            <li onClick={logout}>Sair</li>
          </>)
          :
          (<>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </>)
        }
      </ul>
    </nav>
  )
}
export default Navbar