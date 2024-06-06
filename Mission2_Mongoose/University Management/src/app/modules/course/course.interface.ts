import { Types } from 'mongoose';

export type TPreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credit: number;
  isDeleted: boolean;
  preRequisiteCourses: [];
};
