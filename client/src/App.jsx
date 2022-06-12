import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import { Home, Auth, Chat } from "./pages";
import { AppContext, socket } from "./context/appContext";

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessage] = useState({});

  const user = useSelector((state) => state.user);
  return (
    <>
      <AppContext.Provider
        value={{
          socket,
          rooms,
          setRooms,
          currentRoom,
          setCurrentRoom,
          members,
          setMembers,
          messages,
          setMessages,
          privateMemberMsg,
          setPrivateMemberMsg,
          newMessages,
          setNewMessage,
        }}
      >
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
            </>
          )}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
};

export default App;
