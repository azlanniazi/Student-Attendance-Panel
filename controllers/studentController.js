const Student = require("../models/studentModel");
const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");
const catchAsync = require("../utils/asyncCatch");

exports.setStudentRef = (req, res, next) => {
  if (!req.body.studentRef) req.body.studentRef = req.params.studentRef;
  next();
};

exports.createStudentData = catchAsync(async (req, res, next) => {
  const student = await Student.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.getAllStudentsData = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const filterFields = ["sort", "limit", "page", "fields"];
  filterFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Student.find(JSON.parse(queryStr));
  // query.where("role").equals("student");
  if (req.query.sort) {
    //   for url {{url}}api/v1/users?sort=price&sort=username
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  if (req.query.fields) {
    const selectedFields = req.query.fields.split(",").join(" ");
    query = query.select(selectedFields);
  } else {
    query = query.select("-__v");
  }

  // pagination
  const totalCount = await Student.countDocuments(query);
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const students = await query;

  res.status(200).json({
    status: "success",
    data: {
      students,
      totalCount,
    },
  });
});

exports.getStudentData = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const student = await Student.findById(id);

  if (!student) return next(new AppError(404, "No Such Student Exists!"));

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.updateStudentData = asyncCatch(async (req, res, next) => {
  console.log("updating");
  const id = req.params.id;
  const student = await Student.findByIdAndUpdate(id, req.body);

  if (!student) return next(new AppError(404, "No Student Found"));

  res.status(200).json({
    status: "Success",
    data: {
      student,
    },
  });
});

exports.deleteStudentData = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const student = await Student.findByIdAndDelete(id);

  if (!student) return next(new AppError(404, "No student Found!"));

  res.status(204).json({
    status: "success",
    data: null,
  });
});
