import api from '../../../utils/api'
import { RiLoader4Line } from 'react-icons/ri';

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './AddInstrument.module.css'

import InstrumentForm from '../../form/InstrumentForm'
import Overlay from '../../layout/Overlay';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditInstrument() {
  const [instrument, setInstrument] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  
    api
      .get(`/instruments/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setInstrument(response.data.instrument)
      })
      .catch((err) => {
        console.log(err)
        setFlashMessage(err.response.data.message, 'error')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token, id])
  

  async function updateInstrument(instrument) {
    let msgType = 'success'

    const formData = new FormData()

    const instrumentFormData = await Object.keys(instrument).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < instrument[key].length; i++) {
          formData.append(`images`, instrument[key][i])
        }
      } else {
        formData.append(key, instrument[key])
      }
    })

    formData.append('instrument', instrumentFormData)

    const data = await api
      .patch(`instruments/${instrument._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
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

  return (
    <section>
      {isLoading && (
        <Overlay>
          <RiLoader4Line className={styles.loading} />
        </Overlay>
      )}
      <div className={styles.addinstrument_header}>
        <h1>Editando o Instrumento: {instrument.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {instrument.name && (
        <InstrumentForm handleSubmit={updateInstrument} instrumentData={instrument} btnText="Editar" />
      )}
    </section>
  )
}

export default EditInstrument
