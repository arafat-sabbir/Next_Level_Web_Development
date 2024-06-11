import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.const';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academicSemester',
      required: true,
      unique: true,
    },
    status: { type: String, enum: SemesterRegistrationStatus, default: 'UPCOMING' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, required: true },
    maxCredit: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const SemesterRegistrationModel = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema
);
export default SemesterRegistrationModel;
