import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import { Home, Auth, Chat } from "./pages";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
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
    </>
  );
};

export default App;
