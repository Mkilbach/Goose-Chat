import { useEffect, useState } from "react";
import { CollectionReference, onSnapshot, orderBy, query, type DocumentData } from "firebase/firestore";
import type { MessageType } from ".";

export const useSubscribeToMessages = (collectionRef: CollectionReference<DocumentData, DocumentData> | null) => {
  const [messagesList, setmessagesList] = useState<MessageType[]>([]);

  useEffect(() => {
    if (!collectionRef) return;
    const messagesQuery = query(collectionRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(messagesQuery, querySnapshot => {
      const array: MessageType[] = [];
      querySnapshot.forEach(doc => {
        array.push({ id: doc.id, ...doc.data() } as MessageType);
      });
      setmessagesList(array);
    });

    return () => unsubscribe();
  }, [collectionRef]);

  return messagesList;
};
