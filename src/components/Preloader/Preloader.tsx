import Spiner from '../Spiner/Spiner'
import styles from './preloader.module.scss'

const Preloader = () => {
  return (
    <div className={styles.send}> 
        <div className={styles.spin}>
            <Spiner/>
        </div>
    </div>
  )
}

export default Preloader