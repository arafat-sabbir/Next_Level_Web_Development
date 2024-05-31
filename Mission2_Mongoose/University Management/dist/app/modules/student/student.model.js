"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required and cannot be empty'],
        trim: true,
        maxlength: [20, "First name can't be More Than 20 character long"],
    },
    middleName: {
        type: String,
        required: [true, 'Middle Name is required and cannot be empty'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required and cannot be empty'],
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [true, 'Father Name is required and cannot be empty'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father Occupation is required and cannot be empty'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father Contact Number is required and cannot be empty'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother Name is required and cannot be empty'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother Occupation is required and cannot be empty'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother Contact Number is required and cannot be empty'],
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Local Guardian Name is required and cannot be empty'],
    },
    occupation: {
        type: String,
        required: [true, 'Local Guardian Occupation is required and cannot be empty'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Local Guardian Present Address is required and cannot be empty'],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Id is required and cannot be empty'],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required and cannot be empty'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required and cannot be empty'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required and cannot be empty'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        message: '{VALUE} is not valid',
        required: [true, 'Gender is required and cannot be empty'],
    },
    email: {
        type: String,
        required: [true, 'Email is required and cannot be empty'],
        unique: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is required and cannot be empty'],
    },
    emergencyContactNumber: {
        type: String,
        required: [true, 'Emergency Contact Number is required and cannot be empty'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required and cannot be empty'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required and cannot be empty'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required and cannot be empty'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local Guardian information is required and cannot be empty'],
    },
    profileImage: { type: String },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Admission Semester is required and cannot be empty'],
        ref: 'academicSemester',
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Academic Department is required and cannot be empty'],
        ref: 'academicDepartment',
    },
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
