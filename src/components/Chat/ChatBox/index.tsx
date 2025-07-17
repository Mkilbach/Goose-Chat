import { collection, CollectionReference, doc, setDoc, Timestamp, type DocumentData } from "firebase/firestore";
import { useEffect, useRef } from "react";

import { db } from "../../../firebase";
import { Message } from "../../Message";
import styles from "./styles.module.scss";
import { MessageInput } from "./MessageInput";
import { Loader } from "../../Loader";
import { useSubscribeToMessages } from "./hooks";
import type { userData } from "..";

type Props = {
  roomId: string;
  userData: userData;
};

export type MessageType = {
  id: string;
  text: string;
  userId: string;
  displayName: string;
  createdAt: Timestamp;
};

export const ChatBox = ({ roomId, userData }: Props) => {
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
      displayName: userData.username,
      text: message,
      userId: userData.id,
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
                <Message
                  key={id}
                  text={text}
                  isOwn={userId === userData.id}
                  author={displayName}
                  createdAt={createdAt}
                />
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
