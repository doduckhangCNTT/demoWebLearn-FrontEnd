import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { deleteApi, deleteApiUpload } from "../../../utils/FetchData";
import { AppDispatch, IChapter, ILesson } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";

const lessonAction = {
  updateLesson: async (token: string, dispatch: AppDispatch) => {
    // const result = await checkTokenExp(token, dispatch);
    // const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteLesson: async (
    data: { courseId: string; chapter: IChapter; lesson: ILesson },
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const { courseId, chapter, lesson } = data;

      // console.log({ courseId, chapter, lesson });

      await deleteApi(
        `courses/${courseId}/chapter/${chapter._id}/lesson/${lesson._id}`,
        access_token
      );

      if (lesson.fileUpload.public_id) {
        (lesson.fileUpload.public_id as any).mimetype === "jpg" ||
        (lesson.fileUpload.public_id as any).mimetype === "jpeg" ||
        (lesson.fileUpload.public_id as any).mimetype === "png"
          ? await deleteApiUpload(
              "destroy",
              { public_id: lesson.fileUpload.public_id },
              access_token
            )
          : await deleteApiUpload(
              "destroyVideo",
              { public_id: lesson.fileUpload.public_id },
              access_token
            );
      }

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default lessonAction;
