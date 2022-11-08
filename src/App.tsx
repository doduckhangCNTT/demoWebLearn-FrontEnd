import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import io, { Socket } from "socket.io-client";
import Alert from "./components/alert/Alert";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import Navbar from "./components/global/Navbar";
import actionAuth from "./redux/action/actionAuth";
import { socketSlice } from "./redux/reducers/socketSlice";
import HandleRouter from "./routes/HandleRouter";
import SocketClient from "./socket/SocketClient";
import { API_URL } from "./utils/config";

function App() {
  const dispatch = useDispatch();

  // --------------------- Connect Socket --------------------
  useEffect(() => {
    let newSocket: Socket<DefaultEventsMap, DefaultEventsMap>;
    // newSocket = io("http://localhost:5000");
    newSocket = io(API_URL);
    dispatch(socketSlice.actions.socketComment(newSocket));

    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  // ----------------------------------------------------------
  // Khi lần đầu tiên vào trang thì sẽ cần kiểm trả người dùng đã login lần trước hay chưa, nếu rồi thì lấy lại thông tin của người đó thông qua refresh_token
  useEffect(() => {
    console.log("Refresh_token");
    actionAuth.refreshAction(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refTop = useRef<HTMLButtonElement>(null);

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="h-[100vh] flex flex-col">
      <div className="hidden">
        <SocketClient />
      </div>
      <div>
        <Alert />
        <Header />
      </div>

      <div className="flex flex-1">
        <div className=" max-w-[100px] flex flex-col flex-shrink top-0">
          <Navbar />
        </div>
        <div className="w-full h-full mt-[12px]">
          <HandleRouter />
        </div>
      </div>

      <button
        ref={refTop}
        onClick={handleScrollTop}
        className="bg-sky-600 p-2 rounded-full hover:opacity-[0.8] text-white fixed right-[10px] bottom-[20px] z-10"
      >
        Up Top
      </button>
      <div className="relative bottom-0 bg-black w-full z-30">
        <Footer />
      </div>
    </div>
  );
}

export default App;
