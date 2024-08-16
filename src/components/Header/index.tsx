import Logo from '../../assets/Logo.svg'
import Plus from '../../assets/plus.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { logOut } from '../../store/user/userSlice';
import SearchInput from '../SearchInput';

import styles from './header.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IHeaderProps {
    scrollToForm: () => void;
}

const Header:React.FC<IHeaderProps> = ({scrollToForm}) => {
    const location = useLocation();
    const {isAuth} = useAppSelector(state=> state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const out = ()=>{
        dispatch(logOut());
        navigate('/')
      }
    return (
        <header className={styles.header}>
            {isAuth && (
                <div className={styles.admin}>
                    <div className={styles.btns}>                        
                        {location.pathname !== '/admin' && (
                            <Link to='/admin'>Адмінка</Link>    

                        )}
                        {location.pathname !== '/admin/add_admin' && (
                            <Link to='/admin/add_admin'>додати адміна</Link>    

                        )}
                        <button onClick={out}>Вийти</button>
                        
                    </div>
                </div>
            )
            }

            <div className={styles.ocean}>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
            </div>        
            <Link to='/' className={styles.container}>
                <img src={Logo} alt="logo" />            
                <h1>Петиції Дніпра</h1>
            </Link>  
            {
                (location.pathname === '/' || location.pathname === '/admin') ?
                (
                    <div className={styles.search}>
                        <SearchInput/>
                        {location.pathname === '/' && (
                            <button onClick={scrollToForm} className={styles.btn}>
                                <p>СТВОРИТИ ПЕТИЦІЮ</p>
                                <img src={Plus} alt="logo" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className='mb-[125px]'></div>
                )
            } 
        </header>
    )
}

export default Header