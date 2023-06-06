import api from '../../utils/api'
import { RiLoader4Line } from 'react-icons/ri';

import { useState, useEffect } from 'react'

import styles from './Home.module.css'

import Overlay from '../layout/Overlay';

function Home() {
  const [instruments, setInstruments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('recent');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const applyFilter = (option) => {
    setSelectedOption(option);
  
    let sortedInstruments = [...instruments];
  
    switch (option) {
      case 'recent':
        sortedInstruments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case 'oldest':
        sortedInstruments.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        break;
      case 'longest':
        sortedInstruments.sort((a, b) => b.usageTime - a.usageTime);
        break;
      case 'shortest':
        sortedInstruments.sort((a, b) => a.usageTime - b.usageTime);
        break;
      case 'alphabetical': // Ordenação alfabética
        sortedInstruments.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  
    setInstruments(sortedInstruments);
  }

  useEffect(() => {
    
    api.get('/instruments').then((response) => {
      setInstruments(response.data.instruments)
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    })
  }, [])

  return (
    <section>
       {isLoading && (
        <Overlay>
          <RiLoader4Line className={styles.loading} />
        </Overlay>
      )}
      <div className={styles.instrument_home_header}>
        <h1>Escolha um instrumento</h1>
        <p>Veja os detalhes de cada um e entre em contato com o anunciante.</p>
        <br/>
        <div className={styles.filterCombobox}> Filtros: <br/>
        <select value={selectedOption} onChange={(e) => applyFilter(e.target.value)}>
          <option value="recent">Mais recente</option>
          <option value="oldest">Mais antigo</option>
          <option value="longest">Maior tempo de uso</option>
          <option value="shortest">Menor tempo de uso</option>
          <option value="alphabetical">Ordem alfabética</option> {/* Nova opção */}
        </select>
      </div>
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
          <p>Não há instrumentos cadastrados ou disponíveis para troca no momento!</p>
        )}
      </div>
    </section>
  )
}

export default Home
