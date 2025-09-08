const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footers_schedule");
const { auth } = require("../middlewares/auth");

router.get("/", auth, footerController.getAllFootersSchedules);

// Create page
router.get("/create", auth, (req, res) => {
  res.render("footers_schedule/create", {
    title: "Create Footer Schedule",
    footer: { schedule_list: [] },
    user: req.session.user,
    layout: "base",
  });
});

// Create POST
router.post("/create", auth, footerController.createFooterSchedule);

// Edit page
router.get("/edit/:id", auth, footerController.getFooterScheduleById);

// Update footer info
router.post("/update/:id", auth, footerController.updateData);

// Delete
router.post("/remove/:id", auth, footerController.deleteFooterSchedule);

// Update/create/delete schedule_list items
router.post("/update-schedules/:id", auth, footerController.updateSchedules);

module.exports = router;
