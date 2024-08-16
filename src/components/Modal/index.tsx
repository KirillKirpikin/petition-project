import React, { ReactNode, Dispatch, SetStateAction } from 'react'
import styles from './modal.module.scss'

interface IMdaolProps {
    active: boolean,
    setActive:  Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
    style?: React.CSSProperties;
    outside?:boolean

}
const Modal: React.FC<IMdaolProps> = ({active, setActive, children, style, outside}) => {
  return (
    <div className={`${styles.modal} ${active ? styles.modal__active : ''}`} onClick={()=> outside ? setActive(false): ''}>
        <div className={styles.container} style={style}>
            <div className={styles.content} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>                
        </div>             
    </div>
  )
}

export default Modal