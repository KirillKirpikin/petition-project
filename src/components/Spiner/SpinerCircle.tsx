import styles from './spiner.module.scss'

interface IProps{
  w?: string,
  h?: string,
  height?: string,
}

const SpinerCircle = ({w, h, height}: IProps) => {
  return (
    <div className={styles.circle } style={{height: height ? height : '100%'}}>
        <div className={styles.obj } style={{width: w ? w : '75px', height: h ? h : '75px'}}></div>
    </div>
  )
}

export default SpinerCircle