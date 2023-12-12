const express = require("express");

const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");
const attendanceRecordRouter = require("../routes/attendanceRecordRoutes");

const router = express.Router();

router.use("/:studentRef/attendances", attendanceRecordRouter);

router
  .route("/:id")
  .get(studentController.getStudentData)
  .patch(studentController.updateStudentData)
  .delete(studentController.deleteStudentData);

router
  .route("/")
  .post(studentController.createStudentData)
  .get(studentController.getAllStudentsData);

module.exports = router;
