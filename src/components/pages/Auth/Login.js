import { useState, useContext } from 'react'
import Input from '../../form/Input'
import { Link } from 'react-router-dom'
import Overlay from '../../layout/Overlay';
import { RiLoader4Line } from 'react-icons/ri';

import styles from '../../form/Form.module.css'

/* contexts */
import { Context } from '../../../context/UserContext'

function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    login(user)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        console.error(error)
      })
  }
  

  return (
    <section className={styles.form_container}>
      {isLoading && (
        <Overlay>
          <RiLoader4Line className={styles.loading} />
        </Overlay>
      )}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  )
}

export default Login
