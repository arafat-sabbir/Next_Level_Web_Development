import { Schema, model } from 'mongoose';
import { TCourse, TCourseFaculty, TPreRequisiteCourse } from './course.interface';

/**
 * The schema for a course.
 * @property {string} title - The title of the course.
 * @property {string} prefix - The prefix of the course.
 * @property {number} code - The code of the course.
 * @property {number} credit - The credit of the course.
 * @property {Array<TPreRequisiteCourse>} preRequisiteCourses - The pre-requisite courses.
 */

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true },
  prefix: { type: String, required: true },
  code: { type: Number, required: true },
  credit: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [preRequisiteCourseSchema],
});
const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, required: true, unique: true },
  faculties: [{ type: Schema.Types.ObjectId, required: true }],
});

/**
 * The model for a course.
 * @type {Model<TCourse>}
 */
const CourseModel = model<TCourse>('Course', courseSchema);
const CourseFacultyModel = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);
export { CourseModel, CourseFacultyModel };
