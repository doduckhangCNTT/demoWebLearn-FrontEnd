import { IChapter, ICourses } from "../../utils/Typescript";

export interface IGetCourseType {
  payload: ICourses[];
}

export interface ICourseType {
  payload: ICourses;
}
export interface ICreateChapterOfCourseType {
  payload: {
    courseId: string;
    content: IChapter[];
  };
}
