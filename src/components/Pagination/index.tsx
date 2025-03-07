import React from 'react'

import styles from './pagination.module.scss'


interface IPagination {
    page: number,
    totalPages: number,
    handlePageChange: (newPage: number) => void


}

const Pagination:React.FC<IPagination> = ({page, totalPages, handlePageChange}) => {
    const generatePageNumbers = (currentPage: number, totalPages: number):(number | string)[] => {
        let visiblePages: (number | string)[] = [];
        const adjacentPages: number = 1
        const startPage = Math.max(1, currentPage - adjacentPages);
        const endPage = Math.min(totalPages, currentPage + adjacentPages);
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }
    
        if (startPage > 1) {
            if (startPage > 2) {
                visiblePages = [1, '...', ...visiblePages];
            } else {
                visiblePages = [1, ...visiblePages];
            }
        }
    
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                visiblePages = [...visiblePages, '...', totalPages];
            } else {
                visiblePages = [...visiblePages, totalPages];
            }
        }
    
        return visiblePages;
    }

    return (

        <div className={styles.pagination}>
            {totalPages > 0 && (
                <>
                    <button className={`${styles.btn} ${page === 1 && styles.btn_disable}`} onClick={()=> handlePageChange(page - 1)}>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" stroke="current"/>
                            <path d="M28.22 32.7199C28.0793 32.5793 28.0002 32.3887 28 32.1899V31.8099C28.0023 31.6114 28.0811 31.4216 28.22 31.2799L33.36 26.1499C33.4539 26.0552 33.5817 26.002 33.715 26.002C33.8483 26.002 33.9761 26.0552 34.07 26.1499L34.78 26.8599C34.8741 26.952 34.9271 27.0782 34.9271 27.2099C34.9271 27.3415 34.8741 27.4677 34.78 27.5599L30.33 31.9999L34.78 36.4399C34.8747 36.5337 34.9279 36.6615 34.9279 36.7949C34.9279 36.9282 34.8747 37.056 34.78 37.1499L34.07 37.8499C33.9761 37.9445 33.8483 37.9978 33.715 37.9978C33.5817 37.9978 33.4539 37.9445 33.36 37.8499L28.22 32.7199Z" fill="current"/>
                        </svg>
                    </button>
                    {generatePageNumbers(page, totalPages).map((pageNumber, index) => (
                    <button
                        key={index}
                        className={`${styles.number} ${pageNumber === page && styles.number_active}`}
                        onClick={() => handlePageChange(typeof pageNumber === 'number' ? pageNumber : page)}
                    >
                        {pageNumber}
                    </button>
                    ))}
                    <button className={`${styles.btn} ${styles.btn_next} ${page === totalPages && styles.btn_disable}`} onClick={()=> handlePageChange(page + 1)}>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" stroke="current"/>
                            <path d="M28.22 32.7199C28.0793 32.5793 28.0002 32.3887 28 32.1899V31.8099C28.0023 31.6114 28.0811 31.4216 28.22 31.2799L33.36 26.1499C33.4539 26.0552 33.5817 26.002 33.715 26.002C33.8483 26.002 33.9761 26.0552 34.07 26.1499L34.78 26.8599C34.8741 26.952 34.9271 27.0782 34.9271 27.2099C34.9271 27.3415 34.8741 27.4677 34.78 27.5599L30.33 31.9999L34.78 36.4399C34.8747 36.5337 34.9279 36.6615 34.9279 36.7949C34.9279 36.9282 34.8747 37.056 34.78 37.1499L34.07 37.8499C33.9761 37.9445 33.8483 37.9978 33.715 37.9978C33.5817 37.9978 33.4539 37.9445 33.36 37.8499L28.22 32.7199Z" fill="currect"/>
                        </svg>
                    </button>
                </>
            )}
        </div>
    )
}

export default Pagination