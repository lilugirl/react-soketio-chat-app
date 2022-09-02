import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages,lastMessageRef,typingStatus }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    sessionStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <header className="chat__mainHeader">
        <p>React社群交流区</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          离开交流窗口
        </button>
      </header>
      {/* This shows message sent from you */}
      <div className="message__container">
        {messages.map((message) => {
          if (message.name === sessionStorage.getItem("userName")) {
            return (
              <div className="message__chats" key={message.id}>
                <p className="sender__name">你</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="message__chats" key={message.id}>
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            );
          }
        })}
          {/* At the bottom of the JSX element */}
          <div ref={lastMessageRef}></div>

        {/* This is triggered when a user is typing */}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
     
    </>
  );
};
export default ChatBody;
