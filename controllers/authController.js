const { promisify } = require("util");
const crypto = require("crypto");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const AttendanceRecord = require("../models/attendanceRecordModel");
const Student = require("../models/studentModel");
const User = require("../models/userModel");
const asyncCatch = require("../utils/asyncCatch");
const AppError = require("../utils/AppError");
const { sendEmail } = require("../utils/sendEmail");
const { isSunday } = require("date-fns");

const getToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const sendToken = (user, statusCode, res, options) => {
  const token = getToken(user._id);

  res.status(statusCode).json({
    status: "success",
    data: {
      ...options,
      token,
      user,
    },
  });
};

// controller for signing up
exports.signup = asyncCatch(async (req, res, next) => {
  let user;
  if (req.body.role === "admin")
    return next(new AppError(401, "You are not allowed to create admin"));
  if (!req.body.role) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const student = await Student.create([{ userName: req.body.userName }], {
        session,
      });
      if (!isSunday(new Date())) {
        await AttendanceRecord.create(
          [
            {
              date: Date.now(),
              status: "present",
              studentRef: student[0]._id,
            },
          ],
          { session }
        );
        AttendanceRecord.calculateStats(student[0]._id, session);
      }
      const userList = await User.create(
        [
          {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            studentRef: student[0]._id,
          },
        ],
        {
          session,
        }
      );

      user = userList[0];
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } else {
    user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
  }

  user.password = undefined;

  const token = getToken(user._id);
  res.cookie("jwt", token, {
    expire: new Date(Date.now() + process.env.JWT_EXPIRES_IN),
    secure: process.env.NODE_ENV === "production",
  });

  sendToken(user, 201, res);
});

// controller for logging in
exports.login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;

  // verify if both email and password are included in req.body

  if (!email || !password)
    return next(
      new AppError(400, "Please provide valid email address and password")
    );

  // check whether user exist
  const user = await User.findOne({ email }).select("+password");

  // verify whether the password is correct

  if (!user || !(await user.correctPassword(user.password, password)))
    return next(
      new AppError(401, "The provided email or password is incorrect.")
    );

  const token = getToken(user._id);
  res.cookie("jwt", token, {
    expire: new Date(Date.now() + process.env.JWT_EXPIRES_IN),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  sendToken(user, 201, res, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
});

// middleware to protect routes
exports.protect = asyncCatch(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return next(
      new AppError(401, "You are not authorized to perform this action.")
    );
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // verify whether user exist
  const user = await User.findById(decoded.id);

  if (!user)
    return next(new AppError(404, "User no longer exists, please sign up"));

  // verify whether password was changed after token was issued
  if (user.changedPasswordAfter(decoded.iat))
    return next(new AppError(401, " Session Has expired. Please login again!"));
  req.user = user;
  next();
});

exports.forgetPassword = asyncCatch(async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user)
    return next(new AppError(404, "No user with such email address exist."));

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetTokenUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `To reset your password you are request to to click on this url ${resetTokenUrl}`;

  try {
    await sendEmail({
      email: user.email,
      message,
      subject: "Password reset token",
    });

    res.status(200).json({
      status: "success",
      message: "Reset token has been sent to you email address",
    });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(500, "Failed to send reset token , please try again")
    );
  }
});

exports.resetPassword = asyncCatch(async (req, res, next) => {
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetToken: hashToken,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user)
    return next(new AppError(404, "Token has expired , please try again"));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

exports.updatePassword = asyncCatch(async (req, res, next) => {
  // get user by id
  const user = await User.findById(req.user.id).select("+password");
  // confirm the old password
  if (!(await user.correctPassword(user.password, req.body.passwordOld)))
    return next(new AppError(401, "Your current password is wrong!"));

  // change the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  // send the token
  sendToken(user, 201, res);
});
