import { messageIcon } from "../../components/icons/Icons";

const MainChat = () => {
  return (
    <div className="relative flex justify-center top-0 bottom-0 h-full items-center text-[30px] font-bold">
      {messageIcon.icon}
      <span>Message</span>
    </div>
  );
};

export default MainChat;
