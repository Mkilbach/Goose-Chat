type Props = {
  handleMessageSend: (formData: FormData) => void;
};

export const MessageInput = ({ handleMessageSend }: Props) => {
  return (
    <form action={handleMessageSend}>
      <input name="message" />
      <button>Send</button>
    </form>
  );
};
