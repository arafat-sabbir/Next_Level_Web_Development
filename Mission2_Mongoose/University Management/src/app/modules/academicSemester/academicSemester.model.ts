import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';
import { Months, SemesterCode, SemesterName } from './academicSemester.constant';

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: SemesterName, required: true },
  code: { type: String, enum: SemesterCode, required: true },
  year: { type: Date, required: true },
  startMonth: { type: String, enum: Months, required: true },
  endMonth: { type: String, enum: Months, required: true },
});

const AcademicSemesterModel = model<TAcademicSemester>('academicSemester', AcademicSemesterSchema);
export default AcademicSemesterModel;
