const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  presentPercentage: {
    type: Number,
    default: 0,
  },
  absentPercentage: {
    type: Number,
    default: 1000,
  },
  leavePercentage: {
    type: Number,
    default: 0,
  },
  grade: {
    type: String,
    enum: ["A", "B", "C", "F"],
    default: "A",
  },
  leaveCount: {
    type: Number,
    default: 0,
  },
  absentCount: {
    type: Number,
    default: 0,
  },
  presentCount: {
    type: Number,
    default: 1,
  },
  totalCount: {
    type: Number,
    default: 1,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
