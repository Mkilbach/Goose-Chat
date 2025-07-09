import type { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = HTMLAttributes<HTMLDivElement> & { name: string };

export const ChatRoomTile = ({ name, ...props }: Props) => {
  return (
    <div className={styles.chatRoomTile} {...props}>
      {name}
    </div>
  );
};
