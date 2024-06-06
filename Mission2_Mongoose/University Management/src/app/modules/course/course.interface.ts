import { Types } from 'mongoose';

export type TPreRequisiteCourse = {
  course: Types.ObjectId;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credit: number;
  isDeleted: boolean;
  preRequisiteCourses: [];
};
