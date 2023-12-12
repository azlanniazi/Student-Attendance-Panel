const express = require("express");

const leaveController = require("../controllers/leaveController");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authController.protect, leaveController.createLeave)
  .get(leaveController.getAllLeaves);

router
  .route("/:id")
  .patch(leaveController.updateLeave)
  .get(leaveController.getLeave)
  .delete(leaveController.deleteLeave);

router.patch("/:id/approve", leaveController.approveLeave);
router.patch("/:id/reject", leaveController.rejectLeave);
module.exports = router;
