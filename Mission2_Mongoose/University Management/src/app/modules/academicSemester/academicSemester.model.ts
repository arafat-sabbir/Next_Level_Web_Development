<<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
 import { Schema, model } from 'mongoose';
 import { TAcademicSemester } from './academicSemester.interface';
 import { Months, SemesterCode, SemesterName } from './academicSemester.constant';
 
+/**
+ * AcademicSemester Schema
+ * @typedef {Object} AcademicSemester
+ * @property {SemesterName} name - The name of the semester
+ * @property {SemesterCode} code - The code of the semester
+ * @property {string} year - The year of the semester
+ * @property {Months} startMonth - The start month of the semester
+ * @property {Months} endMonth - The end month of the semester
+ */
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
 
+/**
+ * Pre-save middleware to check if the semester already exists
+ * @param {Function} next - The next function to be called
+ */
 AcademicSemesterSchema.pre('save', async function (next) {
   const isSemesterExist = await AcademicSemesterModel.findOne({ name: this.name, year: this.year });
   if (isSemesterExist) {
     throw new Error('Semester Already Exist');
   } else {
     next();
   }
 });
 
+/**
+ * The AcademicSemester Model
+ * @type {Model<AcademicSemester>}
+ */
 const AcademicSemesterModel = model<TAcademicSemester>('academicSemester', AcademicSemesterSchema);
 
 export default AcademicSemesterModel;
 
<<<<<<<  1803a7ff-7b59-4a08-b9b7-36e227b85a27  >>>>>>>