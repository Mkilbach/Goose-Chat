import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../firebase";
import { ChatBox } from "./ChatBox";
import { ChatRoomsList } from "./ChatRoomsList";
import styles from "./styles.module.scss";
import { Loader } from "../Loader";
import classNames from "classnames";
import { useAuth } from "../../context/AuthContext";

const chatRoomsRef = collection(db, "chatRooms");
const chatRoomsQuery = query(chatRoomsRef);

export type userData = { username: string; id: string };

export const Chat = () => {
  const { user, initialAuthCheckFinished } = useAuth();
  const userData: userData | null = user ? { username: user.displayName || "", id: user.uid } : null;
  const [chatRooms, setChatRooms] = useState<Record<string, string>[]>([]);
  const [chatRoomsLoading, setChatRoomsLoading] = useState(true);
  const [activeChatRoomId, setActiveChatRoomId] = useState<string>("");

  useEffect(() => {
    (async () => {
      const array: Record<string, string>[] = [];
      const querySnapshot = await getDocs(chatRoomsQuery);
      querySnapshot.forEach(doc => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setChatRooms(array);
      setChatRoomsLoading(false);
    })();
  }, [userData?.id]);

  if (!initialAuthCheckFinished) {
    const loaderContainerClasses = classNames({
      [styles.chatContainer]: true,
      [styles["chatContainer--center"]]: true,
    });

    return (
      <div className={loaderContainerClasses}>
        <Loader />
      </div>
    );
  }

  if (!userData)
    return (
      <div className={styles.chatContainer}>
        <h2>Log in to start honking!</h2>
      </div>
    );

  return (
    <div className={styles.chatContainer}>
      {activeChatRoomId ? (
        <>
          <button className={styles.backButton} onClick={() => setActiveChatRoomId("")}>
            Go back to chat rooms list
          </button>
          <ChatBox roomId={activeChatRoomId} userData={userData} />
        </>
      ) : (
        <ChatRoomsList chatRoomsList={chatRooms} handleChatRoomSelect={setActiveChatRoomId} isLoading={chatRoomsLoading} />
      )}
    </div>
  );
};
