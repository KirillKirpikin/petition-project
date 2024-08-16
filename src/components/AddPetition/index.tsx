import { useEffect, useState } from 'react'
import styles from './add-petition.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IPetitionAdd, IPetitionUser } from '../../types/petition.type';
import CustomSelect from '../CustomSelect';
import { topic } from '../../utils/topic';
import CloseSvg from '../../assets/close.svg';
import Modal from '../Modal';
import { useSearchParams } from 'react-router-dom';
import { useCreatePetitionMutation } from '../../store/api/api';
import { toastError, toastSuccess, toastWarn } from '../../utils/toastFunction';

const AddPetition = () => {
    const formFirst = useForm<IPetitionAdd>();
    const formSecond = useForm<IPetitionUser>();
    const [payload, setPayload] = useState<IPetitionAdd | null>(null)
    const [preview, setPreview] = useState(false);
    const [selected, setSelected] = useState(topic[0].title)
    const [createPetition] = useCreatePetitionMutation();

    const [loackalState, setLockalState] = useState<{title: string, goal: string, text: string, topic: string} | null>(null);

    const [serchParams, setSearchParams] = useSearchParams()

    
    const onSubmit:SubmitHandler<IPetitionAdd> = (data)=>{
        const payload ={
            ...data,
            topic: selected
        }
        setPayload(payload)
        setPreview(true)    
    }

    const onSubmitSecond:SubmitHandler<IPetitionUser> = () =>{
        const formData = {
            ...payload,        
        }
        localStorage.setItem(
            'petition_eID_add_new',
            JSON.stringify(formData)
        )

        window.location.replace(
            `${import.meta.env.VITE_AUTH}?path=${import.meta.env.VITE_SESSION}`
        )       
    }

    useEffect(()=>{
        const hashedToken= serchParams.get('hashedToken');
        if(hashedToken && localStorage.getItem('petition_eID_add_new')){
            const payload ={
                data: JSON.parse(localStorage.getItem('petition_eID_add_new')!),
                token: hashedToken
            }

            createPetition(payload).unwrap()
            .then((data) =>{
                if (!data.success && !data.isConfirmed) {
                    toastWarn(
                    'Для створення петиції треба підтвердити акаунт eID за допомогою ДІЯ'
                    );
                    // localStorage.removeItem('petition_eID_add_new');
                    const lockal: {title: string, goal: string, text: string, topic: string} = JSON.parse(localStorage.getItem('petition_eID_add_new')!);
                    setLockalState(lockal)
                    
                    // setSearchParams({});
                }
                if (data.success && data.isConfirmed) {
                    toastSuccess('Петиція на розгляді');
                    localStorage.removeItem('petition_eID_add_new');
                }
                setSearchParams({});

            })
            .catch((err)=>{
                toastError(err.data.message)
                localStorage.removeItem('petition_eID_add_new');
                setSearchParams({})
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serchParams])

    useEffect(()=>{
        if(loackalState){
            formFirst.reset({
                text: loackalState.text,
                goal: loackalState.goal,
                title: loackalState.title
            })
            setSelected(loackalState.topic)                        
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loackalState])

    return (
        <>
            <section className={styles.add}>
                <div className={styles.container}>
                    <h2>СТВОРИТИ ПЕТИЦІЮ</h2>
                    <form className={styles.form} onSubmit={formFirst.handleSubmit(onSubmit)}>
                        <div className={styles.top}>
                            
                            <div className={styles.left}>
                                <div className={styles.input}>
                                    <p>Назва петиції</p>
                                    <input {...formFirst.register('title', {
                                        required:"Введіть назву петиції",
                                        minLength: {
                                            value: 5,
                                            message: 'Мінимум 5 символів'
                                        }
                                    })} type="text"
                                    // defaultValue={loackalState ? loackalState?.title : ''}
                                     />
                                    {formFirst.formState.errors?.title && <p className={styles.error}>{formFirst.formState.errors?.title?.message || 'Error!'}</p>}
                                </div>
                                <div className={styles.input}>
                                    <p>Мета петиції</p>
                                    <input {...formFirst.register('goal', {
                                        required:"Введіть мету петиції",
                                        minLength: {
                                            value: 5,
                                            message: 'Мінимум 5 символів'
                                        }
                                    })} type="text"
                                    // defaultValue={loackalState ? loackalState?.goal : ''} 
                                    />
                                    {formFirst.formState.errors?.goal && <p className={styles.error}>{formFirst.formState.errors?.goal?.message || 'Error!'}</p>}
                                </div>
                                <div className='mb-[30px]'>
                                    <p className='text-[18px] md:text-[22px] font-[700] mb-[10px]'>Тема петиції</p>
                                    <CustomSelect arr={topic} selected={selected} setSelected={setSelected}/>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={`${styles.input} ${styles.textarea}`}>
                                    <p>Напишіть текст</p>
                                    <textarea {...formFirst.register('text', {
                                        required:"Введіть текс петиції",
                                        minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                        }
                                    })}
                                    // defaultValue={loackalState  ? loackalState?.text : ''} 
                                    ></textarea>
                                    {formFirst.formState.errors?.text && <p className={styles.error}>{formFirst.formState.errors?.text?.message || 'Error!'}</p>}
                                </div>          
                            </div>
                        </div>
                        <div className={styles.btns}>
                            <div className={styles.none}></div>
                            <div className={styles.btn}>
                                <button>
                                    ПРОДОВЖИТИ
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.63618 1.636L14.3641 14.3639M14.3641 14.3639H2.34329M14.3641 14.3639V2.34311" stroke="current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Modal outside={true} active={preview} setActive={setPreview} style={{display:'flex', height: '100%', justifyContent:'center', alignItems:'center'}}>
                <div className={styles.modal}>
                    <div className={styles.top}>
                        <button onClick={()=>setPreview(false)}>
                            <img src={CloseSvg} alt="Close" />
                        </button>
                    </div>
                    <div className={styles.title}>
                        <h3>Вітаємо!</h3>
                        <h4>Для створення петиції підтвердіть акаунт eID за допомогою Дія</h4>
                    </div>
                    <form className={styles.form} onSubmit={formSecond.handleSubmit(onSubmitSecond)}>
                        <div className={styles.btn_2}>
                            <button >
                                Підтвердити через eID
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AddPetition