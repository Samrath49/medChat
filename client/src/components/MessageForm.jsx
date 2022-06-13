import { useContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    // console.log("Room messages", roomMessages);
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div>
        MessageForm
        <form
          action=""
          onSubmit={handleSubmit}
          className="h-full flex flex-col justify-evenly items-center gap-3"
        >
          <div className="w-auto border-2 border-slate-700 p-96 rounded-xl">
            {user && !privateMemberMsg?._id && (
              <div className="rounded-sm bg-red-400 ">
                You are in the {currentRoom} room
              </div>
            )}
            {user && privateMemberMsg?._id && (
              <div className="rounded-sm bg-orange-400">
                Your conversation with {privateMemberMsg.name}{" "}
                <img
                  src={privateMemberMsg.picture}
                  className="rounded-full border-2 border-slate-500"
                />
              </div>
            )}
            {!user && <div className="text-red-400">Please Login</div>}
            {user &&
              messages.map(({ _id: date, messagesByDate }, idx) => (
                <div key={idx}>
                  <p>{date}</p>
                  {messagesByDate?.map(
                    ({ content, time, from: sender }, msgidx) => (
                      <div
                        key={msgidx}
                        className={
                          sender?.username == user?.username
                            ? "message"
                            : "incoming-message"
                        }
                      >
                        <div>
                          <div>
                            <img
                              src={sender.picture}
                              className="w-10 h-10 bg-cover rounded-full mr-10"
                              alt=""
                            />
                            <p>
                              {sender._id == user?._id
                                ? "(You)"
                                : "(" + sender.username + ")"}
                            </p>
                          </div>
                          <p>{content}</p>
                          <p>{time}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            <div ref={messageEndRef} />
          </div>
          <div className="flex">
            <input
              type="text"
              name="message"
              htmlFor="message"
              className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-800 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
              placeholder="Hi "
              disabled={!user}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button className="w-24 rounded-xl p-3 mt-2 ml-5 bg-slate-700 text-slate-200">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageForm;
