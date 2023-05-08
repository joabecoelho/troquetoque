import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'

function MyAdoptions() {
  const [instruments, setInstruments] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/instruments/mychanges', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setInstruments(response.data.instruments)
      })
  }, [token])

  async function cancelChange() {
    instruments.available = true
  }

  return (
    <section>
      <div className={styles.instrumentslist_header}>
        <h1>Minhas Trocas</h1>
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
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {instrument.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {instrument.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {instrument.available ? (
                  <p style={{fontWeight: 'bold'}}>Troca em processo
                  </p>
                ) : (
                  <span>Instrumento trocado</span>
                )}
              </div>
            </div>
          ))}
        {instruments.length === 0 && <p>Você ainda não realizou nenhuma troca.</p>}
      </div>
    </section>
  )
}

export default MyAdoptions
