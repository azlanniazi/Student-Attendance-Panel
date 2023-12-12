const { parseISO, startOfDay } = require("date-fns");

const AttendanceRecord = require("../models/attendanceRecordModel");

const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");

exports.createAttendanceRecord = asyncCatch(async (req, res, next) => {
  const date = parseISO(req.body.date);
  const attendanceRecord = await AttendanceRecord.create({
    date: startOfDay(date),
    ...req.body,
  });
  res.status(200).json({
    status: "success",
    data: {
      attendanceRecord,
    },
  });
});

exports.updateAttendanceRecord = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const record = await AttendanceRecord.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!record)
    return next(new AppError(404, "No such attendance record exist."));

  res.status(201).json({
    status: "success",
    data: {
      record,
    },
  });
});

exports.getAllAttendanceRecords = asyncCatch(async (req, res, next) => {
  let filter = {};
  if (req.params.studentRef) filter = { studentRef: req.params.studentRef };
  if (req.body.studentRef) filter = { studentRef: req.body.studentRef };
  let queryObj = { ...req.query };
  const filterFields = ["sort", "page", "limit", "fields"];

  filterFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  let query = AttendanceRecord.find(JSON.parse(queryStr));

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
  query = query.find(filter);

  const totalCount = await AttendanceRecord.countDocuments(query);
  const limit = req.query.limit * 1 || 100;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const records = await query;
  res.status(200).json({
    status: "success",
    data: {
      records,
      totalCount,
    },
  });
});

exports.deleteAttendanceRecord = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const record = await AttendanceRecord.findByIdAndDelete(id);

  if (!record) return next(new AppError(404, "No record Found!"));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMyRecords = asyncCatch(async (req, res, next) => {
  const studentRef = req.user.studentRef;

  filter = { studentRef };

  let queryObj = { ...req.query };

  const filterFields = ["sort", "page", "limit", "fields"];

  filterFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  let query = AttendanceRecord.find(JSON.parse(queryStr));
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
  const totalCount = await AttendanceRecord.countDocuments(query);
  const limit = req.query.limit * 1 || 100;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  query = query.find(filter);
  const attendanceRecord = await query;
  res.status(200).json({
    status: "success",
    data: {
      records: attendanceRecord,
    },
  });
});

exports.markPresent = asyncCatch(async (req, res, next) => {
  const studentRef = req.user.studentRef;
  console.log(studentRef);
  let record;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  record = await AttendanceRecord.findOneAndUpdate(
    {
      studentRef,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
    { status: "present" },
    { new: true }
  );

  if (!record) {
    record = await AttendanceRecord.create({
      date: today,
      studentRef,
      status: "present",
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      record,
    },
  });
});
