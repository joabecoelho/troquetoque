import { Link } from 'react-router-dom'
import { useContext, useRef } from 'react'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

/* context */
import { Context } from '../../context/UserContext'

function Navbar() {
  const audioRef = useRef(null)
  const { authenticated, logout } = useContext(Context)

  function handleClick(e) {
    e.preventDefault(); // Prevent the default navigation behavior
    audioRef.current.src = "./audio/zedamanga.mp3"
    audioRef.current.play()
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_content}>
        <div className={styles.navbar_logo}>
          <a onClick={handleClick} href='/'>
            <img src={Logo} alt='Troque e Toque'/>
            <h2>Troque e Toque</h2>
          </a>
        </div>
        <ul>
          <li>
            <Link to="/">Trocar</Link>
          </li>
          {authenticated ? (
            <>
              <li>
                <Link to="/instrument/mychanges">Minhas Trocas</Link>
              </li>
              <li>
                <Link to="/instrument/myinstruments">Meus Instrumentos</Link>
              </li>
              <li>
                <Link to="/user/profile">Perfil</Link>
              </li>
              <li onClick={logout}>Sair</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/register">Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <audio ref={audioRef} />
    </nav>
  )
}

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '150px' }}>{children}</main>
    </>
  )
}
