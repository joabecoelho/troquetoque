import api from '../../utils/api'
import { RiLoader4Line } from 'react-icons/ri';

import { useState, useEffect } from 'react'

import styles from './Home.module.css'

import Overlay from '../layout/Overlay';

function Home() {
  const [instruments, setInstruments] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    api.get('/instruments').then((response) => {
      setInstruments(response.data.instruments)
      setIsLoading(false);
    })
  }, [])

  return (
    <section>
      <audio className={styles.music} src="./music/serbandido.mp3" loop autoPlay />
       {isLoading && (
        <Overlay>
          <RiLoader4Line className={styles.loading} />
        </Overlay>
      )}
      <div className={styles.instrument_home_header}>
        <h1>Escolha Um Instrumento</h1>
        <p>Veja os detalhes de cada um e entre em contato com o anunciante.</p>
      </div>
      <div className={styles.instrument_container}>
        {instruments.length > 0 &&
          instruments.map((instrument) => (
            <div className={styles.instrument_card} key={instrument._id}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/instruments/${instrument.images[0]})`,
                }}
                className={styles.instrument_card_image}
              ></div>
              <h3>{instrument.name}</h3>
              <p>
                <span className="bold">Tempo de uso:</span> {instrument.usageTime} mês(es)
              </p>
              {instrument.available ? (
                <a href={`/instrument/${instrument._id}`}>Mais detalhes</a>
              ) : (
                <p className={styles.adopted_text}>Troca feita!</p>
              )}
            </div>
          ))}
        {instruments.length === 0 && (
          <p>Não há instrumentos cadastrados ou disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
  )
}

export default Home
