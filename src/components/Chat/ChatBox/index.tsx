import { collection, CollectionReference, doc, setDoc, Timestamp, type DocumentData } from "firebase/firestore";
import { useEffect, useRef } from "react";

import { db } from "../../../firebase";
import { Message } from "../../Message";
import styles from "./styles.module.scss";
import { MessageInput } from "./MessageInput";
import { Loader } from "../../Loader";
import { useSubscribeToMessages } from "./hooks";

type Props = {
  roomId: string;
};

export type MessageType = {
  id: string;
  text: string;
  userId: string;
  displayName: string;
  createdAt: Timestamp;
};

export const ChatBox = ({ roomId }: Props) => {
  const messagesListBottomRef = useRef<HTMLDivElement | null>(null);
  const messagesCollectionRef = useRef<CollectionReference<DocumentData, DocumentData> | null>(
    collection(db, `/chatRooms/${roomId}/messages`)
  );

  const messagesList = useSubscribeToMessages(messagesCollectionRef.current);

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
