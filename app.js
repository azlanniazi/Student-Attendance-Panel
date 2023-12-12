const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

const studentRouter = require("./routes/studentRoutes");
const userRouter = require("./routes/userRoutes");
const attendanceRecordRouter = require("./routes/attendanceRecordRoutes");
const leaveRouter = require("./routes/leaveRoutes");
const globalErrorHandler = require("./controllers/errorController");
const {
  scheduledAttendanceCreator,
} = require("./utils/scheduledAttendanceCreator");

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent along with requests (if needed)
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());
cron.schedule("40 17 * * *", scheduledAttendanceCreator);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/attendances", attendanceRecordRouter);
app.use("/api/v1/leaves", leaveRouter);

app.use(globalErrorHandler);

module.exports = app;

