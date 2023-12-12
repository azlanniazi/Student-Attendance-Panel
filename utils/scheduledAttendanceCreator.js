const Student = require("../models/studentModel");
const AttendanceRecord = require("../models/attendanceRecordModel");
const { isSunday } = require("date-fns");

exports.scheduledAttendanceCreator = async (retry = 0) => {
  try {
    if (!isSunday(new Date())) {
      const students = await Student.find();

      const today = new Date();
      if (today.getDay() !== 0) {
        const attendanceRecords = students.map((student) => {
          return {
            studentRef: student._id,
            date: today,
          };
        });

        await AttendanceRecord.insertMany(attendanceRecords);
      }
    } else {
      return;
    }
  } catch (error) {
    console.log("failed to create Records");
    if (retry < 10) {
      const delayinSeconds = 5;
      setTimeout(() => {
        exports.createAttendanceRecord(retry + 1);
      }, delayinSeconds * 1000);
    } else {
      console.log("Max tries Reached");
    }
  }
};
