/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Status } from '../../types/status.types';
import { useGetPetitionByStatusQuery } from '../../store/api/api';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';

import { AnimatePresence, motion } from 'framer-motion';
import SpinerCircle from '../Spiner/SpinerCircle';
import Pagination from '../Pagination';
import Petition from '../Petition';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IPetition } from '../../types/petition.type';
import SubsPetition from '../SubsPetition';

import styles from './petitions.module.scss'

const Petitions: React.FC = () => {
    const [filter, setFilter] = useState<Status>(Status.IN_PROGRESS)
    const searchValue = useAppSelector(state => state.search)
    const [pageSize, setPageSize] = useState<number>(6);
    const [page, setPage] = useState<number>(1);
    const {data, isLoading, refetch} = useGetPetitionByStatusQuery({status: filter, page, pageSize, searchTerm: searchValue})
    const widthDevice = useDeviceWidth();   

    const totalItems = data?.totalItems || 0;
    const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);
    const [preview, setPreview] = useState(false);
    const [currentPetition, setCurrentPetition] = useState<IPetition | null>(null)
    const petitionRef = useRef<HTMLDivElement>(null)
    const scrollToApplication = () =>{
        if (petitionRef.current) {
            petitionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
        scrollToApplication();
    };

    const fetchData = async () => {
        await refetch();
    };

    useEffect(()=>{
        if(widthDevice > 768){
            setPageSize(9);
        } else if(widthDevice > 609 && widthDevice <= 768 ){
            setPageSize(4)
        }else if(widthDevice <= 609)(
            setPageSize(1)
        )

    }, [widthDevice])

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, [refetch, page, pageSize]);

    return (
        <>
            <section className={styles.petitions}>
                <div className={styles.container}>
                    <div className={styles.filters}>
                        <div className={styles.filter}>
                            <button onClick={()=>{
                                setFilter(Status.IN_PROGRESS)
                                setPage(1)
                            }} className={`${styles.btn} ${filter === Status.IN_PROGRESS && styles.btn_active}`}>Триває збір підписів</button>
                        </div>
                        <div className={styles.filter}>
                            <button onClick={()=>{
                                setFilter(Status.COMPLITED)
                                setPage(1)
                            }} className={`${styles.btn} ${filter === Status.COMPLITED && styles.btn_active}`}>На розгляді</button>
                        </div>
                        <div className={styles.filter}>
                            <button onClick={()=>{
                                setFilter(Status.ANSWER)
                                setPage(1)
                            }} className={`${styles.btn} ${filter === Status.ANSWER && styles.btn_active}`}>З відповіддю</button>
                        </div>
                        <div className={styles.filter}>
                            <button onClick={()=>{
                                setFilter(Status.NOT_SUPPORTED)
                                setPage(1)
                            }} className={`${styles.btn} ${filter === Status.NOT_SUPPORTED && styles.btn_active}`}>Не підтримано</button>
                        </div>
                    </div>
                    <AnimatePresence key={`${filter} ${page}`}>
                        <motion.div
                            initial={{ opacity: 0, x:-100 }}
                            animate={{ opacity: 1, x:0}}
                            exit={{ opacity: 0, x:100 }}
                            transition={{duration: 0.5}}
                        > 
                            {
                                isLoading ? 
                                    <SpinerCircle/>
                                    :data && data.data.length > 0 ? (
                                        <div className={styles.list}>
                                            {data.data.map(item=>(
                                                <Petition 
                                                    key={item._id} 
                                                    style='overflow-hidden drop-shadow-2xl w-full min-[610px]:w-1/2 xl:w-1/3 px-[10px] xl:px-[33px] block mb-[25px] z-[1]' 
                                                    item={item} 
                                                    setCurrent={setCurrentPetition} 
                                                    setPreview={setPreview}/>
                                            ))}
                                        </div>
                                    ): <div className={styles.not_found}>Петицій не знайдено</div>
                            }
                        </motion.div>
                    </AnimatePresence>
                    <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
                </div>
            </section>
            <SubsPetition item={currentPetition} preview={preview} setPreview={setPreview}/>
        </>
        
    )
}

export default Petitions