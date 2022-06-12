import { useSelector } from "react-redux";

const Sidebar = () => {
  const rooms = ["first room", "second room", "third room", "fourth room"];
  const user = useSelector((state) => state.user);

  if (!user) return <></>;
  return (
    <>
      <div className="flex flex-col">
        <h2>Available Rooms</h2>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {rooms.map((room, index) => (
            <li
              key={index}
              className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              {room}
            </li>
          ))}
        </ul>
        <h2>Members</h2>
      </div>
    </>
  );
};

export default Sidebar;
