import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOnePetitionQuery } from '../../store/api/api';

import Petition from '../Petition';
import ShareButton from '../ShareButton';
import Spiner from '../Spiner/Spiner';
import SubsPetition from '../SubsPetition';
import InfoPetition from './InfoPetition';
import styles from './single-petition.module.scss';

const SinglePetition = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);
    const {data, isLoading, isFetching, isSuccess} = useGetOnePetitionQuery({id: id as string});
        
    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate('/');    
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, isFetching, isSuccess])  
    
    return (
        <section className={styles.single}>
            <div className={styles.container}>
                {isLoading ?
                    <Spiner/>
                    : data ? (
                        <>
                            <p className={styles.number}>№ {data.petitionNumber}</p>
                            <div className={styles.body}>
                                <div className={styles.left}>
                                    <InfoPetition item={data}/>
                                </div>
                                <div className={styles.right}>
                                        <Petition style='overflow-hidden drop-shadow-2xl w-full' item={data} setPreview={setPreview}/>
                                    <SubsPetition item={data} preview={preview} setPreview={setPreview}/>
                                    <ShareButton/>
                                </div>
                            </div>
                        </>
                    ): (<div>Немає петиції</div>)
                }
            </div>
        </section>
    )
}

export default SinglePetition;