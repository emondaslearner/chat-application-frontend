import { io } from "socket.io-client";

let socketInstance: any = null;

export const initializeSocket = (token: any) => {
  if (!socketInstance) {
    socketInstance = io("wss://chat-appliation-backend.onrender.com", {
      transports: ["websocket"],  // Force WebSocket only, no polling fallback
      extraHeaders: {
        Authorization: token,
      },
    });
  }
  return socketInstance;
};

export const getSocket = () => {
  if (!socketInstance) {
    const token = localStorage.getItem("token") || "";
    initializeSocket(token);
  }
  return socketInstance;
};
