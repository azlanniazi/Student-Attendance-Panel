const mongoose = require("mongoose");
const Leave = require("../models/leaveModel");
const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");
const AttendanceRecord = require("../models/attendanceRecordModel");
const { parseISO, startOfDay } = require("date-fns");

exports.createLeave = asyncCatch(async (req, res, next) => {
  const date = parseISO(req.body.date);
  const leave = await Leave.create({
    date: startOfDay(date),
    studentRef: req.user.studentRef,
    ...req.body,
  });
  res.status(200).json({
    status: "success",
    data: {
      leave: leave,
    },
  });
});

exports.updateLeave = asyncCatch(async (req, res, next) => {
  const { id } = req.params;

  const leave = await Leave.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!leave) return next(new AppError(404, "No such leave exist."));

  res.status(201).json({
    status: "success",
    data: {
      leave,
    },
  });
});

exports.getAllLeaves = asyncCatch(async (req, res, next) => {
  let filter = {};
  if (req.params.studentRef) filter = { studentRef: req.params.studentRef };
  let queryObj = { ...req.query };
  const filterFields = ["sort", "page", "limit", "fields"];

  filterFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  let query = Leave.find(JSON.parse(queryStr));
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-date");
  }

  if (req.query.fields) {
    const selectedFields = req.query.fields.split(",").join(" ");
    query = query.select(selectedFields);
  } else {
    query = query.select("-__v");
  }
  const totalCount = await Leave.countDocuments(query);
  const limit = req.query.limit * 1 || 100;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  query = query.find(filter);
  const leaves = await query;
  res.status(200).json({
    status: "success",
    data: {
      totalCount,
      leaves,
    },
  });
});

exports.getLeave = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const leave = await Leave.findById(id);

  if (!leave) return next(new AppError(404, "No Such Leave Exists!"));

  res.status(200).json({
    status: "success",
    data: {
      leave,
    },
  });
});

exports.deleteLeave = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const leave = await Leave.findByIdAndDelete(id);

  if (!leave) return next(new AppError(404, "No leave Found!"));

  res.status(204).json({
    status: "success",
    data: {
      leave: null,
    },
  });
});

exports.approveLeave = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const session = await mongoose.startSession();
  session.startTransaction();
  let leave;
  try {
    leave = await Leave.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!leave) return next(new AppError(404, "No leave with such id exist!"));

    await AttendanceRecord.create({
      date: startOfDay(leave.date),
      studentRef: leave.studentRef._id,
      status: "leave",
    });
    await AttendanceRecord.calculateStats(leave.studentRef._id, session);
    await session.commitTransaction();
    res.status(201).json({
      status: "success",
      data: { leave: leave },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

exports.rejectLeave = asyncCatch(async (req, res, next) => {
  const id = req.params.id;
  const leave = await Leave.findByIdAndUpdate(
    id,
    { status: "rejected" },
    { new: true }
  );

  if (!leave) return next(new AppError(404, "No leave with such id exist"));

  res.status(201).json({
    status: "success",
    data: {
      leave,
    },
  });
});

exports.getMyLeaves = asyncCatch(async (req, res, next) => {
  const studentRef = req.user.studentRef;

  filter = { studentRef };

  let queryObj = { ...req.query };

  const filterFields = ["sort", "page", "limit", "fields"];

  filterFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  let query = Leave.find(JSON.parse(queryStr));
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-date");
  }

  if (req.query.fields) {
    const selectedFields = req.query.fields.split(",").join(" ");
    query = query.select(selectedFields);
  } else {
    query = query.select("-__v");
  }

  const limit = req.query.limit * 1 || 100;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  query = query.find(filter);
  const leaves = await query;
  res.status(200).json({
    status: "success",
    totalRecords: leaves.length,
    data: {
      leaves,
    },
  });
});
