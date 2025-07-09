import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../../firebase';
import { ChatBox } from './ChatBox';
import { ChatRoomsList } from './ChatRoomsList';
import styles from './styles.module.css';

const chatRoomsRef = collection(db, "chatRooms");
const chatRoomsQuery = query(chatRoomsRef);

export const Chat = () => {
  const [chatRooms, setChatRooms] = useState<Record<string, string>[]>([]);
  const [activeChatRoomId, setActiveChatRoomId] = useState<string>("");

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



  return (
    <div className={styles.chatContainer}>
      {activeChatRoomId ? (
        <>
          <button className={styles.backButton} onClick={() => setActiveChatRoomId("")}>Go back to chat rooms list</button>
          <ChatBox roomId={activeChatRoomId} />
        </>
      ) : (
        <ChatRoomsList chatRoomsList={chatRooms} handleChatRoomSelect={setActiveChatRoomId} />
      )}
    </div>
  );
};
