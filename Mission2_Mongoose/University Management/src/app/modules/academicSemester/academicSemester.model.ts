import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { Months, SemesterCode, SemesterName } from './academicSemester.constant';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: SemesterName, required: true, trim: true },
    code: { type: String, enum: SemesterCode, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    startMonth: { type: String, enum: Months, required: true, trim: true },
    endMonth: { type: String, enum: Months, required: true, trim: true },
  },
  { timestamps: true }
);

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({ name: this.name, year: this.year });
  if (isSemesterExist) {
    throw new Error('Semester Already Exist');
  } else {
    next();
  }
});

const AcademicSemesterModel = model<TAcademicSemester>('academicSemester', AcademicSemesterSchema);

export default AcademicSemesterModel;
