const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter your password!"],
    minLength: 8,
    maxLength: 20,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Confirm your password"],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords do not match",
    },
  },
  email: {
    unique: true,
    type: String,
    required: [true, "A user must have an email address"],
    validate: [validator.isEmail, "Enter valid email address"],
  },
  photo: {
    type: String,
  },
  studentRef: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  passwordChangedAt: { type: Date },
});

// DOCUMENT MIDDLEWARE
// for encrypting password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;

  next();
});

// query middleware
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "studentRef",
    select: `userName`,
  });

  next();
});

// INSTANCE METHODS
// for verifying password
userSchema.methods.correctPassword = async (password, candidatePassword) => {
  return await bcrypt.compare(candidatePassword, password);
};

// for checking whether password was changed after token was issued
userSchema.methods.changedPasswordAfter = function (jwtCreationTime) {
  if (this.passwordChangedAt) {
    const timeStamp = this.passwordChangedAt.getTime() / 1000;
    return timeStamp > jwtCreationTime;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExpiration = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
