import { Loader } from "../../Loader";
import { ChatRoomTile } from "./ChatRoomTile";

type Props = {
  chatRoomsList: Record<string, string>[];
  handleChatRoomSelect: (id: string) => void;
};

export const ChatRoomsList = ({ chatRoomsList, handleChatRoomSelect }: Props) => {
  return (
    <>
      <h2>Pick your chat room:</h2>
      {chatRoomsList.length ? (
        chatRoomsList.map(el => {
          return <ChatRoomTile key={el.id} onClick={() => handleChatRoomSelect(el.id)} name={el.name} />;
        })
      ) : (
        <Loader />
      )}
    </>
  );
};
