import React from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:1234";

// app context
export const AppContext = React.createContext();

export const socket = io(SOCKET_URL);
