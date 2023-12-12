const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");
const multer = require("multer");
const streamifier = require("streamifier");
const catchAsync = require("../utils/asyncCatch");
const { v2: cloudinary } = require("cloudinary");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image, please upload an image"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const uploadFileToCloudinary = async (file, options) => {
  let streamUpload = (file, options) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(file).pipe(stream);
    });
  };

  const result = await streamUpload(file, options);
  return result;
};
const deleteFileFromCloudinary = async (secureUrl) => {
  const startIndex = secureUrl.indexOf("userpanel/users/");
  const publicId = secureUrl.slice(startIndex);

  await cloudinary.uploader.destroy(publicId);
};

exports.uploadUserPhoto = upload.single("photo");

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const filterFields = ["sort", "limit", "page", "fields"];
  filterFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = User.find(JSON.parse(queryStr));

  query.where("role").equals("student");
  if (req.query.sort) {
    //   for url {{url}}api/v1/users?sort=price,username
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
  const totalCount = await User.countDocuments(query);
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const users = await query;

  res.status(200).json({
    status: "success",
    data: {
      users,
      totalCount,
    },
  });
});

exports.getUser = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) return next(new AppError(404, "No Such User Exists!"));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findByIdAndUpdate(id, req.body);

  if (!user) return next(new AppError(404, "No User Found"));

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

exports.deleteUser = asyncCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);

  if (!user) return next(new AppError(404, "No user Found!"));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "userName");
  if (req.file) {
    const result = await uploadFileToCloudinary(req.file.buffer, {
      folder: "userpanel/users",
    });
    filteredBody.photo = result.secure_url;
    if (req.user.photo) {
      await deleteFileFromCloudinary(req.user.photo);
    }
  }
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = asyncCatch(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(200).json({
    status: "success",
    data: null,
  });
});
