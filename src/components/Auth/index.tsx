import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { loginGlobal } from "../../store/user/userSlice";

import { useEffect } from "react";
import { toastError } from "../../utils/toastFunction";
import { Login } from "../BtnToAuth";
import styles from './auth.module.scss';

const Auth = () => {
    const dispatch = useAppDispatch()
    const [serchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const hashedToken= serchParams.get('hashedToken');
        if(hashedToken){
            dispatch(loginGlobal({token: hashedToken}))
                .unwrap()
                .then(()=>{
                    setSearchParams({})
                    navigate('/admin')
                })
                .catch((err)=>{
                    toastError(err.message)
                    setSearchParams({})
                })
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serchParams])




    return(
        <section className={styles.auth}>
            <div className={styles.container}>
                <Login/>
            </div>
        </section>
    )
}

export default Auth;