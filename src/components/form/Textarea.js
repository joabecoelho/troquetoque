import styles from './Textarea.module.css'

function Textarea({
     type,
     text, 
     name, 
     placeholder, 
     handleOnChange, 
     value, 
     multiple}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <textarea 
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChange}
            value={value}
            {...(multiple ? { multiple } : '')}
            />
        </div>
    )
}

export default Textarea