import gooseLogo from '../../assets/goose-chat-logo.png';
import styles from './styles.module.css';

export const Logo = () => {
  return <img src={gooseLogo} alt="goose-app-logo" className={styles.logo} />;
};
