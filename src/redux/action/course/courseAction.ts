import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { getApi, patchApi, postApi } from "../../../utils/FetchData";
import { AppDispatch, ICourses, ILesson } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { courseSlice } from "../../reducers/course/courseSlice";

interface IDataLesson {
  courseId: string;
  chapterId: string;
  lessonId: string;
  newLessons: ILesson[];
}

const courseAction = {
  getCourses: async (token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("courses", access_token);
      dispatch(courseSlice.actions.getCourses(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  createCourse: async (
    course: ICourses,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      let data;
      if (typeof course.thumbnail.url === "string") {
        data = {
          public_id: course.thumbnail.public_id,
          url: course.thumbnail.url,
        };
      } else {
        let formData = new FormData();
        formData.append("file", course.thumbnail.url);
        const resImg = await postApi("upload", formData, access_token);
        data = { public_id: resImg.data.public_id, url: resImg.data.url };
      }

      const newCourse = {
        ...course,
        thumbnail: data,
      };

      const res = await postApi("course", newCourse, access_token);

      dispatch(
        courseSlice.actions.createCourse(res.data.newCourse as ICourses)
      );
      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  createLesson: async (
    value: {
      lesson: ILesson;
      courseNow?: {
        courseId: string;
        chapterId: string;
      };
      fileUpload: File | string | undefined;
    },
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      // console.log("URL: ", value.lesson.url);
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      // Neu ma fileUpload co gia tri thi mac dinh duong dan youtube se khong co gia tri
      if (value.fileUpload) {
        let formData = new FormData();
        formData.append("file", value.fileUpload);
        const res = await postApi("upload_imgVideo", formData, access_token);

        // console.log("Res Upload: ", res);
        value.lesson = {
          ...value.lesson,
          url: "",
          fileUpload: {
            public_id: res.data.public_id,
            secure_url: res.data.secure_url,
            mimetype: res.data.resource_type,
          },
        };
      }

      const res = await postApi(
        `course/${value.courseNow?.courseId}/chapter/${value.courseNow?.chapterId}/lesson`,
        value.lesson,
        access_token
      );
      dispatch(
        courseSlice.actions.addLessonInChapter({
          courseId: value.courseNow?.courseId,
          content: res.data.content,
        })
      );

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateCourse: async (token: string, dispatch: AppDispatch) => {
    // const result = await checkTokenExp(token, dispatch);

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateLessonsOfChapter: async (
    data: IDataLesson,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const { courseId, chapterId, lessonId, newLessons } = data;
      const res = await patchApi(
        `courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}`,
        newLessons,
        access_token
      );

      console.log("Res: ", res);

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteCourse: async (
    course: ICourses,
    token: string,
    dispatch: AppDispatch
  ) => {
    // const result = await checkTokenExp(token, dispatch);
    // const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default courseAction;
