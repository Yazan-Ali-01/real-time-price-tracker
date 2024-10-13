import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  message: (msg: string) => void;
}

interface ClientToServerEvents {
  message: (msg: string) => void;
}

// Initialize the socket connection
let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const connectSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 20000,
  });

  return socket;
};

export const getSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null => {
  return socket;
};
