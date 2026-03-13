import { collection, CollectionReference, doc, setDoc, Timestamp, type DocumentData } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

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
  const [sendError, setSendError] = useState<string | null>(null);

  const { messagesList, isLoading } = useSubscribeToMessages(messagesCollectionRef.current);

  const handleMessageSend = async (formData: FormData) => {
    if (!messagesCollectionRef.current) return;

    const message = formData.get("message");
    if (!message) return;

    setSendError(null);
    try {
      await setDoc(doc(messagesCollectionRef.current), {
        createdAt: new Date(),
        displayName: userData.username,
        text: message,
        userId: userData.id,
      });
    } catch {
      setSendError("Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    messagesListBottomRef.current?.scrollIntoView();
  }, [messagesList.length]);

  const renderMessages = () => {
    if (isLoading) return <Loader />;
    if (!messagesList.length) return <p>No messages yet</p>;
    return (
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
    );
  };

  return (
    <>
      <div className={styles.chatBox}>
        {renderMessages()}
      </div>
      {sendError && <p className={styles.error}>{sendError}</p>}
      <MessageInput handleMessageSend={handleMessageSend} />
    </>
  );
};
