import {
  collection,
  CollectionReference,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

import { db } from "../../../firebase";
import { Message } from "../../Message";
import styles from "./styles.module.scss";
import { MessageInput } from "./MessageInput";

type Props = {
  roomId: string;
};

export const ChatBox = ({ roomId }: Props) => {
  const messagesCollectionRef = useRef<CollectionReference<DocumentData, DocumentData> | null>(null);
  const [messagesList, setmessagesList] = useState<Record<string, string>[]>([]);

  const fetchMessagesList = useCallback(async () => {
    messagesCollectionRef.current = collection(db, `/chatRooms/${roomId}/messages`);
    const messagesQuery = query(messagesCollectionRef.current, orderBy("createdAt", "asc"));
    const array: Record<string, string>[] = [];
    const querySnapshot = await getDocs(messagesQuery);
    querySnapshot.forEach(doc => {
      array.push({ id: doc.id, ...doc.data() });
    });
    setmessagesList(array);
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;
    fetchMessagesList();
  }, [roomId, fetchMessagesList]);

  const handleMessageSend = async (formData: FormData) => {
    if (!messagesCollectionRef.current) return;
    const message = formData.get("message");

    await setDoc(doc(messagesCollectionRef.current), {
      createdAt: new Date(),
      displayName: "test user",
      text: message,
      userId: "123",
    });

    fetchMessagesList();
  };

  return (
    <>
      <div className={styles.chatBox}>
        {messagesList.map(message => {
          return <Message key={message.id} text={message.text} isOwn={message.userId === '123'} />;
        })}
      </div>
      <MessageInput handleMessageSend={handleMessageSend} />
    </>
  );
};
