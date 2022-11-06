import { checkTokenExp } from "../../../utils/CheckTokenExp";
import {
  deleteApi,
  deleteApiUpload,
  getApi,
  postApi,
} from "../../../utils/FetchData";
import {
  AppDispatch,
  IConversation,
  IMessage,
  INewArrUserChatted,
} from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { messageSlice } from "../../reducers/message/messageSlice";
import { IAuth } from "../../types/authType";

const messageAction = {
  createMessage: async (
    msg: IMessage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("message", msg, access_token);
      // console.log("Res: ", res);
      dispatch(messageSlice.actions.createMessage(res.data));
      // dispatch(
      //   messageSlice.actions.updateMessageConversation({
      //     id: res.data?.recipient,
      //     text: res.data.text || "files",
      //   })
      // );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getConversations: async (authUser: IAuth, dispatch: AppDispatch) => {
    if (!authUser.access_token) return;
    const result = await checkTokenExp(authUser.access_token, dispatch);
    const access_token = result ? result : authUser.access_token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("conversations", access_token);

      // console.log("Conversation: ", res);
      // Save info of Users chatted
      let newArr: INewArrUserChatted[] = [];
      // Filter users chatted with I
      res.data.conversations.forEach((conversation: IConversation) => {
        conversation.recipients.forEach((recipient) => {
          if (recipient._id !== authUser.user?._id) {
            newArr.push({
              ...recipient,
              text: conversation.text,
              media: conversation.media,
            });
          }
        });
      });

      // console.log({ res, array: newArr });
      dispatch(
        messageSlice.actions.getConversations({
          newArr: newArr,
          result: res.data.result,
        })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getMessages: async (
    id: string,
    page: number = 1,
    authUser: IAuth,
    dispatch: AppDispatch
  ) => {
    console.log("Page Action: ", page);
    if (!authUser.access_token) return;
    const result = await checkTokenExp(authUser.access_token, dispatch);
    const access_token = result ? result : authUser.access_token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(
        `messages/${id}?limit=${page * 9}`,
        access_token
      );

      const value = {
        sender: authUser,
        recipient: res.data.messages[0]?.recipient,
        idConversation: res.data.messages[0]?.conversation,
        messages: res.data.messages.reverse(),
        result: res.data.result,
      };
      dispatch(messageSlice.actions.getMessages(value));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateMessage: async (token: string, dispatch: AppDispatch) => {
    // const result = await checkTokenExp(token, dispatch);
    // const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteMessage: async (
    msg: IMessage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await deleteApi(`message/${msg._id}`, access_token);
      res.data?.message.media.forEach(async (item: { public_id: string }) => {
        (item as any).mimetype === "jpg" ||
        (item as any).mimetype === "jpeg" ||
        (item as any).mimetype === "png"
          ? await deleteApiUpload(
              "destroy",
              { public_id: item.public_id },
              access_token
            )
          : await deleteApiUpload(
              "destroyVideo",
              { public_id: item.public_id },
              access_token
            );
      });
      dispatch(
        messageSlice.actions.deleteMessage({ id: res.data.message._id })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default messageAction;
