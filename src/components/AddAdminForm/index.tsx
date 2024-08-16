import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/useTypedSelector'
import { addAdmin } from '../../store/user/userSlice'

import styles from './addadmin.module.scss'

export interface ILogin{
    email: string,
}

const AddAdminForm = () => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: {errors}} = useForm<ILogin>()
    const onSubmit:SubmitHandler<ILogin> = (data)=>{

    const payload = {
        email: data.email,
    }
    dispatch(addAdmin(payload))
        .unwrap()
        // .catch((err)=>{
        //    console.log(err)
        // })
    
    }
  return (
    <section className={styles.auth}>
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Зареєструвати адміна</h2>                                   
            <div className={styles.input}>
                <input  {...register('email', {
                    required: 'Введіть email',
                    pattern:{
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'email повиненн бути наприклад example@gmail.com'
                    }
                })} placeholder='Email'/>
                {errors?.email && <p className={styles.error}>{errors?.email?.message || 'Error!'}</p>}
            </div>

            <div className={styles.btns}>
                <div className={styles.btn}>
                    <button type='submit'>Додати</button>
                </div>                        
            </div>
        </form>       

    </div>
</section>
  )
}

export default AddAdminForm