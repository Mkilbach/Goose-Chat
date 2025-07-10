import styles from "./styles.module.scss";

type Props = {
  handleMessageSend: (formData: FormData) => void;
};

export const MessageInput = ({ handleMessageSend }: Props) => {
  return (
    <form className={styles.form} action={handleMessageSend}>
      <input className={styles.input} name="message" placeholder="Type your message here..."/>
      <button className={styles.button}>Honk</button>
    </form>
  );
};
