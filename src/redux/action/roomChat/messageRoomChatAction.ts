import { checkTokenExp } from "../../../utils/CheckTokenExp";
import {
  deleteApi,
  deleteApiUpload,
  getApi,
  postApi,
} from "../../../utils/FetchData";
import { AppDispatch, IMessageRoom } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { messageRoomSlice } from "../../reducers/roomChat/messageRoomChatSlice";

const messageRoomChatAction = {
  createMessage: async (
    data: IMessageRoom,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("message/roomChat", data, access_token);
      console.log("Create Message: ", res);
      // dispatch(messageRoomSlice.actions.createMessage(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getMessages: async (roomId: string, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`message/roomChat/${roomId}`, access_token);
      console.log("Res message: ", res);

      dispatch(messageRoomSlice.actions.getMessages(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteMessage: async (
    msg: IMessageRoom,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await deleteApi(`message/roomChat/${msg._id}`, access_token);

      res.data?.media.forEach(async (item: { public_id: string }) => {
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
      // dispatch(messageRoomSlice.actions.deleteMessage({ id: res.data._id }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default messageRoomChatAction;
