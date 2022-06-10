import { Sidebar, MessageForm } from "../components";

const Chat = () => {
  return (
    <main className="w-full flex justify-around">
        <Sidebar />
        <MessageForm />
    </main>
  );
};

export default Chat;
