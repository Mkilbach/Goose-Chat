import classNames from "classnames";

import styles from "./styles.module.scss";
import type { Timestamp } from "firebase/firestore";

type Props = {
  text: string;
  isOwn: boolean;
  createdAt: Timestamp;
  author: string;
};

export const Message = ({ text, isOwn, author, createdAt }: Props) => {
  const messageBoxStyles = classNames({
    [styles["message-box"]]: true,
    [styles["message-box--own"]]: isOwn,
  });

  return (
    <div className={messageBoxStyles}>
      <div className={styles["message-header"]}>
        <div className={styles["message-author"]}>{author}</div>
        <div className={styles["message-date"]}>{createdAt.toDate().toLocaleString()}</div>
      </div>
      <div className={styles["message-text"]}>{text}</div>
    </div>
  );
};
