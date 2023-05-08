import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyInstruments() {
  const [instruments, setInstruments] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('/instruments/myinstruments', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setInstruments(response.data.instruments)
      })
  
    }, [token])

  async function removeInstrument(id) {
    let msgType = 'success'

    const data = await api
      .delete(`/instruments/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedInstruments = instruments.filter((instrument) => instrument._id != id)
        setInstruments(updatedInstruments)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  async function concludeChange(id) {
    let msgType = 'success'

    const data = await api
      .patch(`/instruments/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message + " A pagina será recarregada.", msgType)

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  async function reopenExchange(id) {
    let msgType = 'success'

    const data = await api
      .patch(`/instruments/reopen/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message + " A pagina será recarregada.", msgType)

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  return (
    <section>
      <div className={styles.instrumentslist_header}>
        <h1>Meus Instrumentos Cadastrados</h1>
        <Link to="/instrument/add">Cadastrar Instrumento</Link>
      </div>
      <div className={styles.instrumentslist_container}>
        {instruments.length > 0 &&
          instruments.map((instrument) => (
            <div key={instrument._id} className={styles.instrumentlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/instruments/${instrument.images[0]}`}
                alt={instrument.name}
                width="px75"
              />
              <span className="bold">{instrument.name}</span>
              <div className={styles.actions}>
                {instrument.available ? (
                  <>
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeChange(instrument._id)
                        }}
                      >
                        Concluir troca
                      </button>
                    

                    <Link className={styles.actions} to={`/instrument/edit/${instrument._id}`} >Editar</Link>
                    <button
                      onClick={() => {
                        removeInstrument(instrument._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Instrumento já foi trocado<button
                  onClick={() => {
                    reopenExchange(instrument._id)
                  }}
                  >Reabrir troca</button></p>
                  
                )
                }
              </div>
            </div>
          ))}
        {instruments.length === 0 && <p>Ainda não há instrumentos cadastrados!</p>}
      </div>
    </section>
  )
}

export default MyInstruments
