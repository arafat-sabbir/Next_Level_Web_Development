import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, required: true, ref: 'academicfaculties' },
  },
  { timestamps: true }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartMentExist = await AcademicDepartmentModel.findOne({ name: this.name });
  if (isDepartMentExist) {
    throw new Error('Department Already Exist');
  } else {
    next();
  }
});
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartmentModel.findOne({ _id: query._id });
    if (!isDepartmentExist) {
      return next(new Error("Department Doesn't Exist"));
    }
    next();
  });
  

const AcademicDepartmentModel = model('academicdepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;
