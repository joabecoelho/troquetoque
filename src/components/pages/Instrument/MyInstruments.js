import api from '../../../utils/api';
import { RiLoader4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import RoundedImage from '../../layout/RoundedImage';
import Overlay from '../../layout/Overlay';
import useFlashMessage from '../../../hooks/useFlashMessage';
import { RiAlertLine } from 'react-icons/ri';

function MyInstruments() {
  const [instruments, setInstruments] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();
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
        setInstruments(response.data.instruments);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [token]);

  async function removeInstrument(id) {
    let msgType = 'success';
    setIsLoading(true);

    try {
      const response = await api.delete(`/instruments/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFlashMessage(response.data.message + ' A página será recarregada.', msgType);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      msgType = 'error';
      setFlashMessage(err.response.data.message, msgType);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  function handleDeleteConfirmation(id) {
    setDeleteConfirmation(id);
  }

  async function concludeChange(id) {
    let msgType = 'success';

    try {
      setIsLoading(true);

      const response = await api.patch(`/instruments/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFlashMessage(response.data.message + ' A página será recarregada.', msgType);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      msgType = 'error';
      setFlashMessage(err.response.data.message, msgType);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  async function reopenExchange(id) {
    let msgType = 'success';
    setIsLoading(true);

    try {
      const response = await api.patch(`/instruments/reopen/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = response.data;
      setFlashMessage(data.message + ' A página será recarregada.', msgType);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      msgType = 'error';
      const data = err.response.data;
      setFlashMessage(data.message, msgType);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  function handleDeleteConfirmation(id) {
    setDeleteConfirmation(id);
  }

  function handleDeleteCancel() {
    setDeleteConfirmation(null);
  }

  function handleDeleteConfirm(id) {
    removeInstrument(id);
    setDeleteConfirmation(null);
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
        <Link className={styles.btnCadastrar} to="/instrument/add">
          Cadastrar Instrumento
        </Link>
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
                        concludeChange(instrument._id);
                      }}
                    >
                      Concluir troca
                    </button>

                    <Link className={styles.actions} to={`/instrument/edit/${instrument._id}`}>
                      Editar
                    </Link>

                    <button onClick={() => handleDeleteConfirmation(instrument._id)}>
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>
                    Instrumento já foi trocado
                    <button onClick={() => reopenExchange(instrument._id)}>
                      Reabrir troca
                    </button>
                  </p>
                )}
              </div>
            </div>
          ))}
        {instruments.length === 0 && <p>Ainda não há instrumentos cadastrados!</p>}
      </div>
{deleteConfirmation && (
  <>
  
    <div className={styles.overlay}></div>
    <div className={styles.deleteConfirmation}>
    <div className={styles.attentionBar}>
  <RiAlertLine className={styles.attentionIcon} />
  <p className={styles.attention}>Atenção</p>
</div>
      <p>Deseja realmente excluir este instrumento?</p>
      <div className={styles.deleteConfirmationButtons}>
        <button className={styles.btnCancelar} onClick={handleDeleteCancel}>Cancelar</button>
        <button className={styles.btnConfirmar} onClick={() => handleDeleteConfirm(deleteConfirmation)}>Confirmar</button>
      </div>
    </div>
  </>
)}

    </section>
  );
}

export default MyInstruments;
