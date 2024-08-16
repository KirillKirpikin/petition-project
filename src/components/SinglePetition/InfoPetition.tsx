import React, { useEffect, useMemo, useState } from 'react'
import { IPetition } from '../../types/petition.type'
import UserSvg from '../../assets/user.svg'
import DateSvg from '../../assets/date.svg'
import { formatDateTime } from '../../utils/formatDateTime'
import styles from './single-petition.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { Status } from '../../types/status.types'
import Pagination from '../Pagination'
import { useDeviceWidth } from '../../hooks/useDeviceWidth'
import PdfComponent from './PdfComponent'

interface IInfoPetitionProps{
    item: IPetition
}

enum Filter {
    TEXT = 'text',
    SUBS = 'subs',
    ANSWER = 'answer'
}

const InfoPetition:React.FC<IInfoPetitionProps> = ({item}) => {
    const [filter, setFilter] = useState<Filter>(Filter.TEXT);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(6);
    const widthDevice = useDeviceWidth();

    const totalItems = item.subscriber.length || 0;
    const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

    const lastIndex = page * pageSize;
    const firstIndex = lastIndex - pageSize;
    const records = item.subscriber.slice(firstIndex, lastIndex);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    useEffect(()=>{
        if(widthDevice > 768){
            setPageSize(10);
        } else if(widthDevice > 609 && widthDevice <= 768 ){
            setPageSize(10)
        }else if(widthDevice <= 609)(
            setPageSize(5)
        )

    }, [widthDevice])

    return (
        <div className={styles.info}>
            <div className={styles.top}>
                <h2>{item.title}</h2>
                <div className={styles.author}>
                    <div className={styles.img}>
                        <img src={UserSvg} alt="user" />
                    </div>
                    <p>Автор петиції: {item.userName}</p>
                </div>
                <div className={styles.author}>
                    <div className={styles.img}>
                        <img src={DateSvg} alt="user" />
                    </div>
                    <p>Дата оприлюднення: {formatDateTime(item.createdAt)}</p>
                </div>        
            </div>
            <div className={styles.about}>
                <div className={styles.btns}>
                <div className={styles.filter}>
                    <button onClick={()=>setFilter(Filter.TEXT)}
                        className={`${styles.btn} ${filter === Filter.TEXT && styles.btn_active}`}>
                        Текст петиції
                    </button>
                </div>
                <div className={styles.filter}>
                    <button onClick={()=>setFilter(Filter.SUBS)}
                        className={`${styles.btn} ${filter === Filter.SUBS && styles.btn_active}`}>
                        Підписанти
                    </button>
                </div>
                {item.status === Status.IN_PROGRESS ? (
                    <div className={styles.filter}>
                        <button
                            className={`${styles.btn} ${styles.btn_not_active}`}>
                            Триває збір підписів
                        </button>
                    </div>
                    
                    ):
                    (
                    <div className={styles.filter}>
                        <button onClick={()=>setFilter(Filter.ANSWER)}
                            className={`${styles.btn} ${filter === Filter.ANSWER && styles.btn_active}`}>
                            Відповідь на петицію
                        </button>
                    </div>)
                }
            </div>                
            <AnimatePresence key={filter}>
                <motion.div
                    initial={{ opacity: 0, x:-100 }}
                    animate={{ opacity: 1, x:0}}
                    exit={{ opacity: 0, x:100 }}
                    transition={{duration: 0.5}}
                >
                    {filter === Filter.TEXT && (
                        <div>{item.text}</div>
                    )}   
                    {filter === Filter.SUBS && (
                        <>
                        <AnimatePresence key={page}>
                            <ul className={styles.list}>
                                {item.subscriber.length > 0 ? (
                                    <>
                                    <motion.div
                                        initial={{ opacity: 0, x:-1000 }}
                                        animate={{ opacity: 1, x:0}}
                                        exit={{ opacity: 0, x:1000 }}
                                        transition={{duration: 0.5}}
                                    >
                                        {records.map((item)=>(
                                            <li key={item._id}>
                                                <p className={styles.user}><span>{item.number}.</span> {item.userName}</p>
                                                <p className={styles.time}>{formatDateTime(item.subscribe)}</p>
                                            </li>))}

                                    </motion.div>
                                    </>
                                    ):<div className={styles.not_found}>Ніхто не підписав</div>
                                }                            
                            </ul>
                        </AnimatePresence>
                        <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
                        </>
                    )}   
                    {filter === Filter.ANSWER && (
                        <>
                            {item.status === Status.NOT_SUPPORTED && <div>Не зібрано голосів</div>}
                            {item.status === Status.ANSWER && (
                                <>
                                    <PdfComponent link={item.answer}/>
                                </>
                            )}
                        </>
                    )}   
                </motion.div>
            </AnimatePresence>
            </div>

        </div>
    )
}

export default InfoPetition