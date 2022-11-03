import React from "react";
import SocketClientComment from "./SocketClientComment";
import SocketClientMessage from "./socketClientMessage";
import SocketClientMessageRoom from "./SocketClientMessageRoom";
import SocketClientRoom from "./SocketClientRoom";

const SocketClient = () => {
  return (
    <div>
      <SocketClientComment />
      <SocketClientMessage />
      <SocketClientMessageRoom />

      <SocketClientRoom />
    </div>
  );
};

export default SocketClient;
