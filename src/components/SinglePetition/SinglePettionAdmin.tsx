import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddAnswerMutation, useGetOnePetitionQuery, useUpdateStatusMutation } from '../../store/api/api';

import styles from './single-petition.module.scss';
import Spiner from '../Spiner/Spiner';
import CloseSvg from '../../assets/close.svg';
import PositiveSvg from '../../assets/positiveAnswer.svg';
import NegativeSvg from '../../assets/negativeAnswer.svg';
import InfoPetition from './InfoPetition';
import { Status } from '../../types/status.types';
import Modal from '../Modal';
import { toastError, toastSuccess } from '../../utils/toastFunction';
import FileUpload from '../FileUpload';
import Preloader from '../Preloader/Preloader';

const SinglePetitionAdmin = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [refuse, setRefuse] = useState(false);
    const [step, setStep] = useState(1);
    const [value, setValue] = useState('')
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const {data, isLoading, isFetching, isSuccess} = useGetOnePetitionQuery({id: id as string});
    const [updateStatus] = useUpdateStatusMutation();
    const [addAnswer] = useAddAnswerMutation();

    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setValue(e.target.value)
    }

    const handlePosAnswer = () =>{
        const formData ={
            status: Status.IN_PROGRESS
        }
        updateStatus({id, formData}).unwrap()
            .then(()=>{
                setPreview(true)
            })
            .catch((err)=>{
                toastError(err.data.message)
            })
    } 
    const handleNegAnswer = () =>{
        const formData ={
            status: Status.REJECTED
        }
        updateStatus({id, formData}).unwrap()
            .then(()=>{
                setStep(2)
            })
            .catch((err)=>{
                toastError(err.data.message)
            })
    }

    const handleAnswer = () =>{
        setSendIsLoading(true)
        const formData = new FormData();
        formData.append('file', selectedFiles[0])

        addAnswer({id, formData}).unwrap()
            .then((data)=>{
                setSendIsLoading(false)
                toastSuccess(data.message);
                setSelectedFiles([]);
            })
            .catch((error) => {
                setSendIsLoading(false)
                toastError(error.data.message)
            });
    }
    
    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate('/');    
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, isFetching, isSuccess])  
    
    return (
        <>
            {sendIsLoading && <Preloader/>}
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
                                    {
                                        data.status === Status.WAITING && (
                                                <div className={styles.admin_btn}>
                                                    <div className={styles.btn}>
                                                        <button onClick={()=>handlePosAnswer()}>ОПУБЛІКУВАТИ</button>
                                                    </div>
                                                    <div className={`${styles.btn} ${styles.btn_white}`}>
                                                        <button onClick={()=>setRefuse(true)}>ВІДХИЛИТИ</button>
                                                    </div>

                                                </div>
                                        )
                                    }
                                    {data.status === Status.COMPLITED && (
                                        <div className={styles.answer}>
                                            <h2>Прикріпити відповідь на Петицію</h2>
                                            <FileUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} quantity={1}/>
                                            {selectedFiles.length > 0 && (
                                                <div className='mt-[30px]'>
                                                    <div className={styles.btn}>
                                                        <button onClick={()=>handleAnswer()}>Додати відповідь</button>
                                                    </div>
                                                </div>
                                            )} 
                                        </div>                                        
                                    )}
                                    </div>

                                </div>
                            </>
                        ): (<div>Немає петиції</div>)
                    }
                </div>
            </section>
            <Modal outside={true} active={preview} setActive={setPreview} style={{display:'flex', height: '100%', justifyContent:'center', alignItems:'center'}}>
                <div className={styles.modal}>
                    <div className={styles.top}>
                        <button onClick={()=>setPreview(false)}>
                            <img src={CloseSvg} alt="Close" />
                        </button>
                    </div>
                    <div className={styles.body}>
                        <h2>Петицію успішно опцблікованно</h2>
                        <div className={styles.img}>
                            <img src={PositiveSvg} alt="positive"/>
                        </div>
                        <div className={styles.close}>
                            <button onClick={()=>setPreview(false)}>Закрити</button>
                        </div>

                    </div>
                </div>
            </Modal>
            <Modal outside={true} active={refuse} setActive={setRefuse} style={{display:'flex', height: '100%', justifyContent:'center', alignItems:'center'}}>
                <div className={styles.modal}>
                    <div className={styles.top}>
                        <button onClick={()=>{
                                setRefuse(false)
                            }}>
                            <img src={CloseSvg} alt="Close" />
                        </button>
                    </div>
                    <div className={styles.body}>

                        {step === 1 && (
                            <>
                                <h3>Причина відхилення</h3>
                                <div className={styles.text}>
                                    <textarea value={value} onChange={onChange}>                                    
                                    </textarea>                                
                                </div>
                                <div className={styles.close}>
                                    <button onClick={()=>handleNegAnswer()}>ВІДПРАВИТИ</button>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h2>Петицію ВІДХИЛЕНО</h2>
                                <div className={styles.img}>
                                    <img src={NegativeSvg} alt="negative"/>
                                </div>
                                <div className={styles.close}>
                                    <button onClick={()=>{
                                        setRefuse(false)
                                        setStep(1)
                                    }}>Закрити</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SinglePetitionAdmin;