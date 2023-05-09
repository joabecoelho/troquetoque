import { Link } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

/* context */
import { Context } from '../../context/UserContext'

function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const { authenticated, logout } = useContext(Context)

  function handleClick() {
    setIsPlaying(true)
    audioRef.current.src = "./music/tempresente.mp3"
    audioRef.current.play()
  }

  function handleClickRapunzel() {
    setIsPlaying(true)
    audioRef.current.src = "./music/rapunzel.mp3"
    audioRef.current.play()
  }

  function handleClickCabelo() {
    setIsPlaying(true)
    audioRef.current.src = "./music/cabelodeabelha.mp3"
    audioRef.current.play()
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_content}>
        <div className={styles.navbar_logo}>
          <a href="/">
            <img src={Logo} alt='Troque e Toque' />
            <h2>Troque e Toque</h2>
          </a>
        </div>
        <ul>
          <li>
            <Link to="/" onClick={handleClick}>Trocar</Link>
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
                <Link to="/login" onClick={handleClickRapunzel}>Entrar</Link>
              </li>
              <li>
                <Link to="/register" onClick={handleClickCabelo}>Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
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
