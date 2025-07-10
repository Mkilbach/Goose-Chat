import {
  collection,
  CollectionReference,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

import { db } from "../../../firebase";
import { Message } from "../../Message";
import styles from "./styles.module.scss";
import { MessageInput } from "./MessageInput";
import { Loader } from "../../Loader";

type Props = {
  roomId: string;
};

type MessageType = {
  id: string;
  text: string;
  userId: string;
  displayName: string;
  createdAt: Timestamp;
};

export const ChatBox = ({ roomId }: Props) => {
  const messagesListBottomRef = useRef<HTMLDivElement | null>(null);
  const messagesCollectionRef = useRef<CollectionReference<DocumentData, DocumentData> | null>(null);
  const [messagesList, setmessagesList] = useState<MessageType[]>([]);

  const fetchMessagesList = useCallback(async () => {
    messagesCollectionRef.current = collection(db, `/chatRooms/${roomId}/messages`);
    const messagesQuery = query(messagesCollectionRef.current, orderBy("createdAt", "asc"));
    const array: MessageType[] = [];
    const querySnapshot = await getDocs(messagesQuery);
    querySnapshot.forEach(doc => {
      array.push({ id: doc.id, ...doc.data() } as MessageType);
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
    if (!message) return;

    await setDoc(doc(messagesCollectionRef.current), {
      createdAt: new Date(),
      displayName: "test user",
      text: message,
      userId: "123",
    });

    fetchMessagesList();
  };

  useEffect(() => {
    messagesListBottomRef.current?.scrollIntoView();
  }, [messagesList.length]);

  return (
    <>
      <div className={styles.chatBox}>
        {messagesList.length ? (
          <>
            {messagesList.map(({ id, text, userId, displayName, createdAt }) => {
              return (
                <Message key={id} text={text} isOwn={userId === "123"} author={displayName} createdAt={createdAt} />
              );
            })}
            <div ref={messagesListBottomRef}></div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <MessageInput handleMessageSend={handleMessageSend} />
    </>
  );
};
