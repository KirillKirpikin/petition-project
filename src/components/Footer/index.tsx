import FLogo from '../../assets/FLogo.svg'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='flex justify-center'>
        <a href='https://ednipro.dp.ua/' target='_blank' className={styles.container}>
          <img src={`${FLogo}`} alt="logo" />
          <h2>Розроблено єДніпро</h2>
        </a>
      </div>
      
    </footer>
  )
}

export default Footer;