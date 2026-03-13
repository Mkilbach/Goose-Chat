import classNames from "classnames";

import styles from "./styles.module.scss";
import type { Timestamp } from "firebase/firestore";
import trashIcon from "../../assets/trash.svg";

type Props = {
  id: string;
  text: string;
  isOwn: boolean;
  createdAt: Timestamp;
  author: string;
  onDelete: (id: string) => void;
};

export const Message = ({ id, text, isOwn, author, createdAt, onDelete }: Props) => {
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
      {isOwn && (
        <button className={styles["message-delete"]} onClick={() => onDelete(id)} aria-label="Delete message">
          <img src={trashIcon} alt="" />
        </button>
      )}
    </div>
  );
};
