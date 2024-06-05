import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourse } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true },
  prefix: { type: String, required: true },
  code: { type: Number, required: true },
  credit: { type: Number, required: true },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

const CourseModel = model<TCourse>('Course', courseSchema);
export default CourseModel;
