'use client';
import { logIn } from 'common/auth/utils';
import styles from './login-view.module.scss';

export default function LoginButton() {
  return (
    <button className={styles.feideButton} onClick={logIn} type="button">
      Logg inn
    </button>
  );
}
