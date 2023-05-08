import styles from './RoundedImage.module.css'

function RoundedImage({ src, alt, width, height }) {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width],[height]}`}
      style={{ width: `${width}px`, height: `${height}px`}}
      src={src}
      alt={alt}
    />
  )
}

export default RoundedImage
