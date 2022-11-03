import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import messageAction from "../../redux/action/message/messageAction";
import { authSelector, messageSelector } from "../../redux/selector/selectors";
import { getApi, postApi } from "../../utils/FetchData";
import { FormSubmit, IMessage, IUser } from "../../utils/Typescript";
import ShowContentChat from "./ShowContentChat";
import ShowMessages from "./ShowMessages";

const ContentChat = () => {
  const { authUser } = useSelector(authSelector);
  const { conversation } = useSelector(messageSelector);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const refDisplay = useRef<HTMLDivElement>(null);
  const [page] = useState(1);

  useEffect(() => {
    const solution = async () => {
      const res = await getApi(`users/${id}`, authUser.access_token);
      setUser(res.data.user);
    };

    solution();
  }, [authUser.access_token, id]);

  useEffect(() => {
    if (!id || !authUser.access_token) return;
    messageAction.getMessages(id, page, authUser, dispatch);
    if (refDisplay.current) {
      refDisplay.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [authUser, dispatch, id, page]);

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if (text.trim().length === 0 && media.length === 0) return;
    if (!authUser.access_token || !authUser.user || !id) return;

    // Upload Img Video
    let imgArr = [];
    if (media.length > 0) {
      for (const item of media) {
        let formData = new FormData();
        if ((item as any).camera) {
          formData.append("file", (item as any).camera);
        } else {
          formData.append("file", item);
        }

        const res = await postApi(
          "upload_imgVideo",
          formData,
          authUser.access_token
        );

        console.log("Res Upload: ", res);
        const data = await res.data;
        imgArr.push({
          mimetype: data.format,
          public_id: data.public_id,
          url: data.secure_url,
        });
      }
    }
    const msg = {
      sender: authUser.user,
      recipient: id,
      text,
      media: imgArr,
    };
    messageAction.createMessage(msg, authUser.access_token, dispatch);
    setText("");
    setMedia([]);

    if (refDisplay.current) {
      refDisplay.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div>
      <ShowContentChat
        value={user}
        text={text}
        media={media}
        setText={setText}
        setMedia={setMedia}
        handleSubmit={handleSubmit}
      >
        {(conversation?.data as any).messages?.map(
          (msg: IMessage, index: React.Key | null | undefined) => {
            return (
              <div key={index} className="mt-2">
                <ShowMessages msg={msg} />
              </div>
            );
          }
        )}
      </ShowContentChat>
    </div>
  );
};

export default ContentChat;
