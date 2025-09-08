const express = require("express");
const router = express.Router();
const contactHoursController = require("../controllers/contacts_hours");
const { auth } = require("../middlewares/auth");

router.get("/", auth, contactHoursController.getAllContactHours);

router.get("/create", auth, (req, res) => {
  res.render("contacts_hours/create", {
    title: "Create Contact Hours",
    contactHour: { days: [] },
    user: req.session.user,
    layout: "base",
  });
});

router.post("/create", auth, contactHoursController.createContactHours);
router.get("/edit/:id", auth, contactHoursController.getContactHoursById);
router.post("/update/:id", auth, contactHoursController.updateContactHours);
router.post("/remove/:id", auth, contactHoursController.deleteContactHours);
router.post("/update-days/:id", auth, contactHoursController.updateDays);

module.exports = router;
