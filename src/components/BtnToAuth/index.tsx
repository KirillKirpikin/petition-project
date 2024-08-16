import { FC } from 'react';
import styles from './btn_auth.module.scss'

export const Login: FC = () => {
  return (
    <div className={styles.btn}>
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault();
          window.location.replace(
            `${import.meta.env.VITE_AUTH}?path=${
              import.meta.env.VITE_SESSION
            }auth_admin/`
          );
        }}
      >
        Увійти через eDnipro EID
      </button>
    </div>
  );
};