const express = require("express");

const attendanceRecordController = require("../controllers/attendanceController");
const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(attendanceRecordController.getAllAttendanceRecords)
  .post(
    studentController.setStudentRef,
    attendanceRecordController.createAttendanceRecord
  );
router.route("/:id").patch(attendanceRecordController.updateAttendanceRecord);

router.patch(
  "/markPresent",
  authController.protect,
  attendanceRecordController.markPresent
);

module.exports = router;
