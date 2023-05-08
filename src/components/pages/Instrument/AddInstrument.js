import api from '../../../utils/api'
import { RiLoader4Line } from 'react-icons/ri';


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './AddInstrument.module.css'

import InstrumentForm from '../../form/InstrumentForm'
import Overlay from '../../layout/Overlay';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddInstrument() {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  async function registerInstrument(instrument) {
    setIsLoading(true);
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
      .post(`instruments/create`, formData, {
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
    if (msgType != 'error') {
      navigate('/instrument/myinstruments')
    }
    setIsLoading(false);
  }
  

  return (
    <section>
      {isLoading && (
        <Overlay>
          <RiLoader4Line className={styles.loading} />
        </Overlay>
      )}
      <div className={styles.addinstrument_header}>
        <h1>Cadastre um Instrumento</h1>
        <p>Depois ele ficará disponível para troca</p>
      </div>
      <InstrumentForm handleSubmit={registerInstrument} btnText="Cadastrar" />
    </section>
  )
}

export default AddInstrument
