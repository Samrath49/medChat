import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import { Home, Auth, Chat } from "./pages";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
