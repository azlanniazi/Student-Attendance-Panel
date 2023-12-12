const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const { isSunday } = require("../utils/isSunday");

const leaveSchema = mongoose.Schema(
  {
    studentRef: {
      type: mongoose.Schema.ObjectId,
      required: "leave must have a studentRef",
      ref: "Student",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    date: { type: Date, required: "leave must have atleast one date" },
    reason: { type: String, required: "Please provide reason for leave" },
  },
  { timestamps: true }
);

// Document Middleware
// middleware to check if requested leave is in future
leaveSchema.pre("save", async function (next) {
  const today = new Date();
  if (!(this.date > today))
    return next(new AppError(401, "Leave must be for the future dates"));

  next();
});

// middleware to check if the day is sunday
leaveSchema.pre("save", async function (next) {
  if (isSunday(this.date))
    return next(new AppError(401, "Leave cannot be created for sunday!"));

  next();
});

leaveSchema.pre("save", async function (next) {
  const existingLeave = await Leave.findOne({
    date: this.date,
    studentRef: this.studentRef,
  });
  if (existingLeave)
    return next(new AppError(401, "Leave with this date already exist"));

  next();
});

// query middleware

leaveSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "studentRef",
    select: "userName",
  });

  next();
});

leaveSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().date)
    return next(
      new AppError(401, "Cannot change the date of leave once created")
    );

  next();
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
