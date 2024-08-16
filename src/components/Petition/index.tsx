/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { IPetition } from '../../types/petition.type'
import { Link } from 'react-router-dom'
import PenSvg from '../../assets/pen.svg';


import styles from './petition.module.scss'
import { getDaysRemaining } from '../../utils/getDaysRemaining'
import { truncateText } from '../../utils/truncateText';
import { Status } from '../../types/status.types';
import { useGetOnePetitionQuery} from '../../store/api/api';

interface IPetitionProps {
    item: IPetition
    style: string
    admin?: boolean
    setPreview?:  Dispatch<SetStateAction<boolean>>,
    setCurrent?:  Dispatch<SetStateAction<IPetition | null>>,
  }

const Petition: React.FC<IPetitionProps> = ({setPreview, setCurrent, item, style, admin = false}) => {
    const [isHovered, setIsHovered] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const procSign = useMemo(()=> item.__v * 100 / item.limit, [item.__v])
    const daysLeft = useMemo(()=>getDaysRemaining(item.finishedAt),[item.finishedAt]);
    const titleText = useMemo(()=>truncateText(item.title, 235),[item.title])

    useGetOnePetitionQuery({ id: item._id }, { skip: !isHovered });

    return (
        <div 
            className={style}
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.body}>
                <Link to={ admin ? `petition-admin/${item._id}` : `/petition/${item._id}`} className={styles.link}>
                    <p className={styles.number}>№ {item.petitionNumber}</p>
                    <h3 className={styles.title}>{titleText}</h3>
                    <p className={styles.calc}>Залишилось: <span>{ daysLeft > 0 ? daysLeft : 0 } днів</span></p>
                    <p className={styles.calc}>Зібрано: <span>{item.__v} голоси</span></p>
                    <div className={styles.scale}>
                        <div style={{width: `${procSign}%`}} className={styles.procent}></div>
                    </div>                        
                </Link>
                {
                    (admin ===  false && (item.status === Status.IN_PROGRESS)) && (
                        <div className={styles.bottom}>
                            <button onClick={()=>{
                                if(setPreview) setPreview(true)
                                if(setCurrent) setCurrent(item)
                                }}>
                                <img src={PenSvg} alt="pen" />
                                Підписати петицію
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Petition