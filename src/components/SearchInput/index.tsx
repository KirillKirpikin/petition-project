import React, { useEffect, useState } from 'react'
import SearchSvg from '../../assets/search.svg'
import { useAppDispatch } from '../../hooks/useTypedSelector'
import { setSearch } from '../../store/search/searchSlice'
import styles from './search-input.module.scss'

const SearchInput = () => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(setSearch(searchTerm));
        }, 500);

        return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <div  className={styles.input}>
            <input value={searchTerm} onChange={onChange} type="text" placeholder='Пошук петицій'/>
            <img src={SearchSvg} alt="logo" />
        </div>
    )
}

export default SearchInput