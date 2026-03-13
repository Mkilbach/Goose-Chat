import { Loader } from "../../Loader";
import { ChatRoomTile } from "./ChatRoomTile";

type Props = {
  chatRoomsList: Record<string, string>[];
  handleChatRoomSelect: (id: string) => void;
  isLoading?: boolean;
};

export const ChatRoomsList = ({ chatRoomsList, handleChatRoomSelect, isLoading }: Props) => {
  const renderContent = () => {
    if (isLoading) return <div style={{ display: "flex", justifyContent: "center" }}><Loader /></div>;
    if (!chatRoomsList.length) return <p>No chat rooms available</p>;
    return chatRoomsList.map(el => {
      return <ChatRoomTile key={el.id} onClick={() => handleChatRoomSelect(el.id)} name={el.name} />;
    });
  };

  return (
    <>
      <h2>Pick your chat room:</h2>
      {renderContent()}
    </>
  );
};
