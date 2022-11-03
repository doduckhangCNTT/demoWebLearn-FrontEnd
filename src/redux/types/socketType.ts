import { Socket } from "socket.io-client";

export const SOCKET = "SOCKET";

export interface ISocketType {
  payload: Socket;
}
