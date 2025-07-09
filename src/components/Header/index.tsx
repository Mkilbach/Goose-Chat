import { AppName } from '../AppName';
import { Logo } from '../Logo';
import SignIn from '../SignIn';
import styles from './styles.module.css';

export const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.headerElement}>
          <Logo />
          <AppName />
        </div>
        <div>
          <SignIn />
        </div>
      </div>
    </div>
  );
};
