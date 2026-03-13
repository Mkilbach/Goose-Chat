import { useRef } from "react";

import styles from "./styles.module.scss";

type Props = {
  handleMessageSend: (formData: FormData) => Promise<void>;
};

export const MessageInput = ({ handleMessageSend }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    formRef.current?.reset();
    await handleMessageSend(formData);
  };

  return (
    <form ref={formRef} className={styles.form} action={handleAction}>
      <input className={styles.input} name="message" placeholder="Type your message here..."/>
      <button className={styles.button}>Honk</button>
    </form>
  );
};
