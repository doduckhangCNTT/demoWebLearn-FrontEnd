import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { deleteApi, getApi, patchApi, postApi } from "../../../utils/FetchData";
import {
  AppDispatch,
  IRoomChat,
  IRoomChatList,
  IUser,
} from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { messageRoomSlice } from "../../reducers/roomChat/messageRoomChatSlice";
import { roomChatSlice } from "../../reducers/roomChat/roomChatSlice";

const roomChatAction = {
  createRoomChat: async (
    room: IRoomChat,
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("roomChat", room, access_token);
      console.log("Res room: ", res);
      dispatch(roomChatSlice.actions.createRoomChat(res.data));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getRoomChats: async (dispatch: AppDispatch, token: string) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("roomChats", access_token);
      // console.log("Res: ", res);

      dispatch(roomChatSlice.actions.getRoomsChat(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  addUserRoomChat: async (
    value: { user: IUser; room: IRoomChatList },
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await patchApi(
        `add_user/roomChat/${value.room._id}`,
        { user: value.user },
        access_token
      );

      await dispatch(messageRoomSlice.actions.addUserRoomChat(res.data));
      dispatch(roomChatSlice.actions.addUserRoomChat(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  addUserAdminRoomChat: async (
    value: { user: IUser; room: IRoomChatList },
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await patchApi(
        `add_userAdmin/roomChat/${value.room._id}`,
        { user: value.user },
        access_token
      );

      await dispatch(messageRoomSlice.actions.addUserAdminRoomChat(res.data));
      dispatch(roomChatSlice.actions.addUserAdminRoomChat(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteUserRoomChat: async (
    value: { user: IUser; room: IRoomChatList },
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await patchApi(
        `remove_user/roomChat/${value.room._id}`,
        { user: value.user },
        access_token
      );

      console.log("Res: ", res);
      await dispatch(messageRoomSlice.actions.deleteUserRoomChat(res.data));
      dispatch(roomChatSlice.actions.deleteUserRoomChat(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteUserAdminRoomChat: async (
    value: { admin: IUser; room: IRoomChatList },
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await patchApi(
        `remove_userAdmin/roomChat/${value.room._id}`,
        { admin: value.admin },
        access_token
      );

      // console.log("Res: ", res);
      await dispatch(
        messageRoomSlice.actions.deleteUserAdminRoomChat(res.data)
      );
      dispatch(roomChatSlice.actions.deleteUserAdminRoomChat(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateRoomChat: async (
    value: { room: IRoomChatList; name: string },
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const data = {
        nameRoom: value.name,
      };
      const res = await patchApi(
        `roomChat/${value.room._id}`,
        data,
        access_token
      );
      console.log("Res: ", res);

      dispatch(
        roomChatSlice.actions.updateRoomChat({
          roomChat: value.room,
          name: value.name,
        })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteRoomChat: async (
    room: IRoomChatList,
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await deleteApi(`roomChat/${room._id}`, access_token);
      // console.log("Res delete room: ", res);
      dispatch(roomChatSlice.actions.deleteRoomChat(res.data));
      await deleteApi(`messages/roomChat/${room._id}`, access_token);

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default roomChatAction;
