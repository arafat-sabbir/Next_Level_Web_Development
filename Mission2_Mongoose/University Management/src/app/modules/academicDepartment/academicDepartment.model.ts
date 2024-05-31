import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

// Define the model schema for the academic department
const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true }, // Name of the department
    academicFaculty: { type: Schema.Types.ObjectId, required: true, ref: 'academicFaculties' }, // Reference to the faculty it belongs to
  },
  { timestamps: true }
);

// Middleware to check if the department already exists before saving
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartMentExist = await AcademicDepartmentModel.findOne({ name: this.name });
  if (isDepartMentExist) {
    throw new AppError(500, `${this.name} Already Exist`);
  } else {
    next();
  }
});

// Middleware to check if the department exists before updating
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findOne({ _id: query._id });
  if (!isDepartmentExist) {
    throw new AppError(404, "Department Doesn't Exist");
  }
  next();
});

// Create the model using the schema
const AcademicDepartmentModel = model('academicDepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;

