import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = {
  text: string;
  isOwn: boolean;
};

export const Message = ({ text, isOwn }: Props) => {
  const messageBoxStyles = classNames({
    [styles["message-box"]]: true,
    [styles["message-box--own"]]: isOwn,
  });

  return (
    <div className={messageBoxStyles}>
      <div className={styles["message-header"]}>
        <div className={styles["message-author"]}>author test 123:</div>
        <div className={styles["message-date"]}>11.12.2025 11:23</div>
      </div>
      <div className={styles["message-text"]}>{text}</div>
    </div>
  );
};
