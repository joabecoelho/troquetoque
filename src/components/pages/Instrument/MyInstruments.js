import api from '../../../utils/api'
import { RiLoader4Line } from 'react-icons/ri';

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'
import Overlay from '../../layout/Overlay';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyInstruments() {
  const [instruments, setInstruments] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  
    api
      .get('/instruments/myinstruments', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setInstruments(response.data.instruments)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token])
  

  async function removeInstrument(id) {
    setIsLoading(true);

    try {
    const response = await api
      .delete(`/instruments/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      const { message } = response.data
      setFlashMessage(message, 'success')
    } catch (err) {
      console.log(err)
      const { data } = err.response
      setFlashMessage(data.message, 'error')
    } finally {
      setIsLoading(true);
    }
  }

  async function concludeChange(id) {
    let msgType = 'success'
  
    try {
      setIsLoading(true)
  
      const response = await api.patch(`/instruments/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
  
      setFlashMessage(response.data.message + ' A pagina será recarregada.', msgType)
  
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      console.log(err)
      msgType = 'error'
      setFlashMessage(err.response.data.message, msgType)
    } finally {
      setIsLoading(false)
    }
  }
  

  async function reopenExchange(id) {
    let msgType = 'success'
    setIsLoading(true);
  
    try {
      const response = await api.patch(`/instruments/reopen/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = response.data;
      setFlashMessage(data.message + " A pagina será recarregada.", msgType);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      msgType = 'error';
      const data = err.response.data;
      setFlashMessage(data.message, msgType);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <section>
      {isLoading && (
        <Overlay>
          <RiLoader4Line className={styles.loading} />
        </Overlay>
      )}
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
