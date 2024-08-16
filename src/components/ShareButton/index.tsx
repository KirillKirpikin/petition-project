import { toastSuccess } from '../../utils/toastFunction';
import styles from './share.module.scss'

const ShareButton  = () => {
    const currentURL = window.location.href;

    const copyURLToClipboard = () => {
        navigator.clipboard.writeText(currentURL)
          .then(() => {
            toastSuccess('Скопійовано до буферу обміну')
          })
          .catch((error) => {
            console.error('Ошибка копирования: ', error);
          });
      };
    
      const openFacebookShare = () => {
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;
        window.open(facebookShareURL, '_blank');
      };
      const shareViaEmail = () => {
        const emailSubject = 'Поділитись посиланням';
        const emailBody = `Подивись петицію: ${currentURL}`;
      
        const mailToLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = mailToLink;
      };
      

    
      return (
        <div className={styles.share}>
            <h3>Поділіться петицією:</h3>
            <div className={styles.btns}>
                <button onClick={openFacebookShare}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40 20C40 8.96 31.04 0 20 0C8.96 0 0 8.96 0 20C0 29.68 6.88 37.74 16 39.6V26H12V20H16V15C16 11.14 19.14 8 23 8H28V14H24C22.9 14 22 14.9 22 16V20H28V26H22V39.9C32.1 38.9 40 30.38 40 20Z" fill="black"/>
                    </svg>
                </button>
                <button className={styles.mail} onClick={shareViaEmail}>
                    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 32C2.9 32 1.95867 31.6087 1.176 30.826C0.393333 30.0433 0.00133333 29.1013 0 28V4C0 2.9 0.392 1.95867 1.176 1.176C1.96 0.393333 2.90133 0.00133333 4 0H36C37.1 0 38.042 0.392 38.826 1.176C39.61 1.96 40.0013 2.90133 40 4V28C40 29.1 39.6087 30.042 38.826 30.826C38.0433 31.61 37.1013 32.0013 36 32H4ZM20 18L36 8V4L20 14L4 4V8L20 18Z" fill="black"/>
                    </svg>
                </button>
                <button onClick={copyURLToClipboard}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.6572 26.4853L18.0003 32.1421C16.044 34.0984 13.687 35.0761 10.9292 35.0752C8.17153 35.0742 5.81451 34.0966 3.85818 32.1421C1.90185 30.1858 0.924156 27.8288 0.925099 25.071C0.926042 22.3133 1.90373 19.9563 3.85818 18L9.51503 12.3431L12.3435 15.1715L6.6866 20.8284C5.50809 22.0069 4.91884 23.4211 4.91884 25.071C4.91884 26.721 5.50809 28.1352 6.6866 29.3137C7.86512 30.4922 9.27933 31.0815 10.9292 31.0815C12.5792 31.0815 13.9934 30.4922 15.1719 29.3137L20.8287 23.6568L23.6572 26.4853ZM13.7577 25.071L10.9292 22.2426L22.243 10.9289L25.0714 13.7573L13.7577 25.071ZM26.4856 23.6568L23.6572 20.8284L29.314 15.1715C30.4925 13.993 31.0818 12.5788 31.0818 10.9289C31.0818 9.27899 30.4925 7.86478 29.314 6.68627C28.1355 5.50775 26.7213 4.9185 25.0714 4.9185C23.4215 4.9185 22.0073 5.50776 20.8287 6.68627L15.1719 12.3431L12.3435 9.51469L18.0003 3.85784C19.9566 1.90151 22.3141 0.923345 25.0728 0.923346C27.8315 0.923345 30.188 1.90151 32.1425 3.85784C34.0988 5.81417 35.0769 8.17166 35.0769 10.9303C35.0769 13.689 34.0988 16.0455 32.1425 18L26.4856 23.6568Z" fill="black"/>
                    </svg>
                </button>            
            </div>
        </div>
      );
}

export default ShareButton 