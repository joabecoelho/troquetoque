import { useContext, useState } from 'react'
import { RiLoader4Line } from 'react-icons/ri';
import Overlay from '../../layout/Overlay';

import Input from '../../form/Input'
import {Link} from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* context */ 
import { Context } from '../../../context/UserContext'

function Register() {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {register} = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        await register(user)
        setTimeout(() => {
            setIsLoading(false);
          }, 1000);
    }

    return (
        <section className={styles.form_container}>
            {isLoading && (
        <Overlay>
          <RiLoader4Line className={styles.loading} />
        </Overlay>
      )}
            <h1>Registrar</h1>
            
              <form onSubmit={handleSubmit}>
                  <Input 
                  text="Nome"
                  type="text"
                  name="name"
                  placeholder="Digite o seu nome"
                  handleOnChange={handleChange}
                  />
                  <Input 
                  text="Telefone"
                  type="text"
                  name="phone"
                  placeholder="Digite o seu telefone"
                  handleOnChange={handleChange}
                  />
                  <Input 
                  text="E-mail"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
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
                  text="Confirmação de senha"
                  type="password"
                  name="confirmpassword"
                  placeholder="Repita sua senha"
                  handleOnChange={handleChange}
                  />
                  <input type='submit' value='Cadastrar' />
              </form>
            
            <p>
                Já tem conta? <Link to='/login'>Faça login.</Link>
            </p>
        </section>
    )
}

export default Register
