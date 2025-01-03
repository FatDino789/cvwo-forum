import { MessageCircle } from "lucide-react";

const ChatBox = () => {
  return (
    <div className="p-4 bg-light border border-gray-200 border-2 rounded-5">
      <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
        <MessageCircle className="w-6 h-6" />
        <h2 className="text-[20px] font-bold">Chat Box</h2>
      </div>
      <div
        className="d-flex justify-content-center text-center"
        style={{ minWidth: "80%", maxWidth: "250px", height: "240px" }}
      >
        <text
          className="text-muted mx-0"
          style={{ fontSize: "0.9rem", marginTop: "25%" }}
        >
          There are no current chats. Start a chat with another user
        </text>
      </div>
    </div>
  );
};

export default ChatBox;
