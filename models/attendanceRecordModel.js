const mongoose = require("mongoose");

const Student = require("./studentModel");
const AppError = require("../utils/AppError");
const { isSunday } = require("../utils/isSunday");

const calculateGrads = (stats) => {
  let grade;
  if (stats.length > 0) {
    if (stats[0].presentPercentage > 90) {
      grade = "A";
    } else if (stats[0].presentPercentage > 80) {
      grade = "B";
    } else if (stats[0].presentPercentage > 70) {
      grade = "C";
    } else {
      grade = "F";
    }
  }
  return grade;
};

const calculateUpdatedStudentsStats = (stats, grade) => {
  let studentStats = {};
  if (stats.length > 0) {
    studentStats = {
      totalCount: stats[0].totalCount,
      presentPercentage: stats[0].presentPercentage,
      absentPercentage: stats[0].absentPercentage,
      leavePercentage: stats[0].leavePercentage,
      grade,
      leaveCount: stats[0].leaveCount,
      absentCount: stats[0].absentCount,
      presentCount: stats[0].presentCount,
    };
  } else {
    studentStats = {
      totalCount: 0,
      presentPercentage: 0,
      absentPercentage: 0,
      leavePercentage: 0,
      grade,
      leaveCount: 0,
      absentCount: 0,
      presentCount: 0,
    };
  }
  return studentStats;
};

const attendanceRecordSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Attendacne record must have a date"],
    },
    status: {
      type: String,
      enum: ["present", "absent", "leave"],
      default: "absent",
    },
    studentRef: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
      required: [true, "Attendance Record must have a user"],
    },
  },
  { timestamps: true }
);

attendanceRecordSchema.index({ studentRef: 1 });
attendanceRecordSchema.index({ date: 1 });

attendanceRecordSchema.index({ studentRef: 1, date: 1 }, { unique: true });

// document middleware
// document middleware to check whether record for the same day already exist
attendanceRecordSchema.pre("save", async function (next) {
  if (isSunday(this.date))
    return next(
      new AppError(401, "Attendance Record for Sunday can not be created!")
    );

  next();
});

attendanceRecordSchema.pre("save", async function (next) {
  const existingRecord = await AttendanceRecord.findOne({
    studentRef: this.studentRef,
    date: this.date,
  });

  if (existingRecord)
    return next(new AppError(400, "Record for this date already exist!"));

  next();
});

// STATIC METHOD

// to calculate stats using aggregate pipeline
attendanceRecordSchema.statics.calculateStats = async function (
  studentRef,
  session
) {
  const stats = await this.aggregate(
    [
      {
        $match: {
          studentRef: studentRef,
        },
      },

      {
        $group: {
          _id: studentRef,
          presentCount: {
            $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
          },
          absentCount: {
            $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] },
          },
          leaveCount: {
            $sum: { $cond: [{ $eq: ["$status", "leave"] }, 1, 0] },
          },
          totalCount: { $sum: 1 },
        },
      },
      {
        $addFields: {
          presentPercentage: {
            $multiply: [{ $divide: ["$presentCount", "$totalCount"] }, 100],
          },
          absentPercentage: {
            $multiply: [{ $divide: ["$absentCount", "$totalCount"] }, 100],
          },
          leavePercentage: {
            $multiply: [{ $divide: ["$leaveCount", "$totalCount"] }, 100],
          },
        },
      },
    ],
    { session }
  );
  console.log(stats);
  const grade = calculateGrads(stats);
  const updatedStudentStats = calculateUpdatedStudentsStats(stats, grade);
  await Student.findByIdAndUpdate(studentRef, updatedStudentStats, { session });
};

// Post Document middleware
attendanceRecordSchema.post("save", async function () {
  await this.constructor.calculateStats(this.studentRef);
});

// Query Middleware
attendanceRecordSchema.pre(/^findOneAndUpdate/, async function (next) {
  if (this.getUpdate().date) {
    return next(
      new AppError(400, "Cannot change the date of document once it's created")
    );
  }
  next();
});

attendanceRecordSchema.post(/^findOneAnd/, async function () {
  const record = await this.model.findOne(this);
  this.model.calculateStats(record.studentRef);
});

const AttendanceRecord = mongoose.model(
  "AttendanceRecord",
  attendanceRecordSchema
);

module.exports = AttendanceRecord;
