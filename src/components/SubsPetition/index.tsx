import React, { Dispatch, SetStateAction } from 'react'
import Modal from '../Modal'
import CloseSvg from '../../assets/close.svg';

import styles from './subs.module.scss'
import { IPetition } from '../../types/petition.type';

interface SubsPetitionProps {
    preview: boolean,
    setPreview:  Dispatch<SetStateAction<boolean>>,
    item: IPetition | null
}

const SubsPetition:React.FC<SubsPetitionProps> = ({preview, setPreview, item}) => {   
    if(item === null){
        return null;
    }

    return (
        <Modal outside={true} active={preview} setActive={setPreview} style={{display:'flex', height: '100%', justifyContent:'center', alignItems:'center'}}>
            <div className={styles.modal}>
                <div className={styles.top}>
                    <button onClick={()=>setPreview(false)}>
                        <img src={CloseSvg} alt="Close" />
                    </button>
                </div>

                <div className={styles.title}>
                    <h3>Вітаємо!</h3>
                    <h4>Підтвердіть данні через eID для підписання петиції № {item.petitionNumber}</h4>
                    {/* <h5>Всі поля є обов’язковими для заповнення.</h5> */}
                </div>
                <button onClick={(e)=>{
                    e.preventDefault();
                    localStorage.setItem('petition_eID_ID', item._id);
                    window.location.replace(
                        `${import.meta.env.VITE_AUTH}?path=${import.meta.env.VITE_SESSION}petition/`
                    )   
                }}
                
                className={styles.eID}>
                    Підтвердити через eID
                </button>  
            </div>
        </Modal>
    )
}

export default SubsPetition