import { Loader } from '../../Loader';

type Props = {
  chatRoomsList: Record<string, string>[];
  handleChatRoomSelect: (id: string) => void;
};

export const ChatRoomsList = ({ chatRoomsList, handleChatRoomSelect }: Props) => {
  return (
    <>
      <h2>Pick your chat room:</h2>
      {chatRoomsList.length ? (
        <ul>
          {chatRoomsList.map(el => {
            return (
              <li key={el.id} onClick={() => handleChatRoomSelect(el.id)}>
                {el.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <Loader />
      )}
    </>
  );
};
