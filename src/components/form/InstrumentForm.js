import { useState } from 'react'

import formStyles from './Form.module.css'

import Input from './Input'
import Select from './Select'
import Textarea from './Textarea'

function InstrumentForm({ handleSubmit, instrumentData, btnText }) {
  const [instrument, setInstrument] = useState(instrumentData || {})
  const [preview, setPreview] = useState([])
  const colors = ['Amarelo', 'Azul', 'Branco', 'Cinza', 'Dourado', 'Laranja', 'Lilás', 'Marrom', 'Prateado', 'Preto', 'Rosa', 'Roxo', 'Verde', 'Vermelho'];

  function onFileChange(e) {
    console.log(Array.from(e.target.files))
    setPreview(Array.from(e.target.files))
    setInstrument({ ...instrument, images: [...e.target.files] })
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'usageTime' && Number(value) < 1) {
      return; // Impede que números negativos sejam atribuídos ao campo "usageTime"
    }

    setInstrument({ ...instrument, [name]: value })
  }

  function handleColor(e) {
    setInstrument({
      ...instrument,
      color: e.target.options[e.target.selectedIndex].text,
    })
  }

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(instrument)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_instrument_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={instrument.name}
                key={`${instrument.name}+${index}`}
              />
            ))
          : instrument.images &&
            instrument.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/instruments/${image}`}
                alt={instrument.name}
                key={`${instrument.name}+${index}`}
              />
            ))}
      </div>
      <Input
        text="Imagens do instrumento"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do instrumento"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={instrument.name || ''}
      />
      <Input
        text="Tempo de uso do instrumento (meses)"
        type="number"
        name="usageTime"
        placeholder="Digite o tempo de uso"
        handleOnChange={handleChange}
        value={instrument.usageTime || ''}
      />
      <Select
        name="color"
        text="Selecione a cor do instrumento"
        options={colors}
        handleOnChange={handleColor}
        value={instrument.color || ''}
      />
      <Textarea
        text="Descrição do instrumento"
        type="textarea"
        name="description"
        placeholder="Digite a descrição"
        value={instrument.description || ''}
        handleOnChange={handleChange}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}

export default InstrumentForm
