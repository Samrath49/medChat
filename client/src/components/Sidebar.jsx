import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import { FaDotCircle } from "react-icons/fa";
const Sidebar = () => {
  // const rooms = ["first room", "second room", "third room", "fourth room"];
  const user = useSelector((state) => state.user);
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    // console.log("The payload is here:", payload);
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:1234/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert("Please Login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notification
    dispatch(resetNotifications(room));
  };

  socket.off("nottifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "=" + id1;
    }
  };

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    // joinRoom()
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  if (!user) return <></>;
  return (
    <>
      <div className="flex flex-col">
        <h2>Available Rooms</h2>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {rooms.map((room, index) => (
            <li
              key={index}
              className={`w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 cursor-pointer justify-between active:${
                room == currentRoom
              }`}
              onClick={() => joinRoom(room)}
              // we have to show notifications badge here
            >
              {room}
              {currentRoom !== room && (
                <>
                  <span className="text-slate-200">
                    {user.newMessages[room]}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
        <h2>Members</h2>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {members.map((member) => (
            <li
              key={member._id}
              className={`cursor-pointer active:${
                privateMemberMsg?.id == member?._id
              }`}
              onClick={() => handlePrivateMemberMsg(member)}
              disabled={member._id === user._id}
            >
              <div className="flex items-center">
                <div className="flex">
                  <img src={member.picture} className="rounded-full w-7 h-7" />
                  {member.status == "online" ? (
                    <FaDotCircle size={10} className="text-green-600" />
                  ) : (
                    <FaDotCircle size={10} className="text-yellow-500" />
                  )}
                  {member.username}
                  {member._id === user?._id && "(You)"}
                  {member.status == "offline" && "(Offline)"}
                </div>
                <div>
                  <span className="text-slate-300 text-sm">
                    {user.newMessages[orderIds(member._id, user._id)]}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
