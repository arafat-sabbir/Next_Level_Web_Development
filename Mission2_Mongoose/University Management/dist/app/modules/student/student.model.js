"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, "first name can't be More Than 20 character long"],
    },
    middleName: { type: String, required: [true, 'Middle Name is required'] },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: [true, 'Father Name is required'] },
    fatherOccupation: {
        type: String,
        required: [true, 'Father Occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father Contact Number is required'],
    },
    motherName: { type: String, required: [true, 'Mother Name is required'] },
    motherOccupation: {
        type: String,
        required: [true, 'Mother Occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother Contact Number is required'],
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Local Guardian Name is required'] },
    occupation: {
        type: String,
        required: [true, 'Local Guardian Occupation is required'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Local Guardian Present Address is required'],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: [true, 'Id Is Required'] },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id Is Required'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        message: '{VALUE} Is Not Valid',
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNumber: {
        type: String,
        required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local Guardian information is required'],
    },
    profileImage: { type: String },
    admissionSemester: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'academicSemester' },
    academicDepartment: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'academicDepartment' },
    isDeleted: { type: Boolean, default: false },
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true,
});
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// studentSchema.virtual('fullName').get(function () {
//   return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName} `;
// });
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
