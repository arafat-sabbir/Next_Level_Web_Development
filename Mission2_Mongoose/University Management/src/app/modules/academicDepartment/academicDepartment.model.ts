import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, required: true, ref: 'academicfaculties' },
  },
  { timestamps: true }
);

const AcademicDepartmentModel = model('academicdepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;
