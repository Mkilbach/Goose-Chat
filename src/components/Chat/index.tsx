import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../firebase";
import { ChatBox } from "./ChatBox";
import { ChatRoomsList } from "./ChatRoomsList";
import styles from "./styles.module.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Loader } from "../Loader";
import classNames from "classnames";

const chatRoomsRef = collection(db, "chatRooms");
const chatRoomsQuery = query(chatRoomsRef);

export const Chat = () => {
  const [initialAuthCheckFinished, setInitialAuthCheckFinished] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [chatRooms, setChatRooms] = useState<Record<string, string>[]>([]);
  const [activeChatRoomId, setActiveChatRoomId] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setIsUserLogged(!!user);
      setInitialAuthCheckFinished(true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const array: Record<string, string>[] = [];
      const querySnapshot = await getDocs(chatRoomsQuery);
      querySnapshot.forEach(doc => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setChatRooms(array);
    })();
  }, []);

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

  if (!isUserLogged)
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
          <ChatBox roomId={activeChatRoomId} />
        </>
      ) : (
        <ChatRoomsList chatRoomsList={chatRooms} handleChatRoomSelect={setActiveChatRoomId} />
      )}
    </div>
  );
};
