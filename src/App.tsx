import { Suspense, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from './hooks/useTypedSelector';
import { checkUser } from './store/user/userSlice';
import Header from './components/Header';
import Preloader from './components/Preloader/Preloader';

import './App.css'
import Footer from './components/Footer';
import AppRoutes from './Routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch()

    const addRef = useRef<HTMLDivElement>(null);

    const scrollToForm = () => {
      if (addRef.current) {
        addRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    useEffect(()=>{
        dispatch(checkUser())
        setIsLoading(false)
    }, [dispatch])


    return (
        <div className='flex flex-col min-h-screen'>
            <Header scrollToForm={scrollToForm}/>
            <main className="flex-grow">
                {isLoading ? <Preloader/> : <Suspense fallback={<Preloader/>}><AppRoutes addRef={addRef}/></Suspense>}
            </main>
            <Footer/>
            <ToastContainer/>
        </div>
    )
}

export default App
