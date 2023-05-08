import api from '../../../utils/api'

import { FaWhatsapp } from 'react-icons/fa';

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './InstrumentDetails.module.css'
import RoundedImage from '../../layout/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function InstrumentDetails() {
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [instrument, setInstrument] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')

  const widthImage = '40px'
  const heigthImage = '40px'

  useEffect(() => {
    api.get(`/instruments/${id}`).then((response) => {
      setInstrument(response.data.instrument)
    })
  }, [id])

  async function schedule() {
    let msgType = 'success'

    const data = await api
      .patch(`instruments/schedule/${instrument._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

    const handleClick = () => {

      const phoneNumber = instrument.user.phone;

      const url = `https://wa.me/55${phoneNumber}`;
      window.open(url)
    }

  return (
    <>
      {instrument.name && (
        <section className={styles.instrument_details_container}>
          <div className={styles.instrumentdetails_header}>
            <h1>{instrument.name}</h1>
            <h2 className={styles.anunciadopor} >Anunciado por {instrument.user.name}</h2>
            <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}/images/users/${instrument.user.image}`
            }
            alt={user.name}
            width={150}
            height={150}
          />
            <hr style={{marginTop: '20px'}} />
          </div>
          <div className={styles.instrument_images}>
            {instrument.images.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API}/images/instruments/${image}`}
                alt={instrument.name}
              />
            ))}
          </div>
          <p>
            <span className="bold">Tempo de uso:</span> {instrument.usageTime} meses
          </p>
          <p>
            <span className="bold">Descrição:</span> {instrument.description}
          </p>
          <span className={styles.interesse}>Caso tenha interesse, adicione a sua lista de <br/> <Link to="/instrument/mychanges" className={styles.interesse}>Minhas trocas</Link> e entre em contato com o anunciante!</span>
          {token ? (
            <div className={styles.botoes}>
            <button className={styles.btnaddminhastrocas} 
              onClick={schedule}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e67e22'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff9100'} 
            >
              Adicionar a Minhas trocas
            </button>
            <button className={styles.btnWpp} onClick={handleClick}>
              <span>Conversar no WhatsApp</span>
            </button>
          </div>
          ) : (
            <p style={{ marginTop: '20px'}}>
              Você precisa <Link to="/register">criar uma conta</Link> ou <Link to="/login">fazer login</Link> para
              ter acesso ao contato do anunciante.
            </p>
          )}
        </section>
      )}
    </>
  )
}

export default InstrumentDetails
