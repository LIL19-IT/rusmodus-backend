const express = require("express");
const router = express.Router();
const advantageController = require("../controllers/procurement_advantages");
const { auth } = require("../middlewares/auth");

// 📌 Բոլոր procurement advantages
router.get("/", auth, advantageController.getAllAdvantages);

// 📌 Ստեղծել նոր procurement advantage (form)
router.get("/create", auth, (req, res) => {
  res.render("procurement_advantages/create", {
    title: "Create Procurement Advantage",
    advantage: { advantages: [] },
    user: req.session.user,
    layout: "base",
  });
});

// 📌 Ստեղծել նոր procurement advantage (POST)
router.post("/create", auth, advantageController.createAdvantage);

// 📌 Edit procurement advantage form
router.get("/edit/:id", auth, advantageController.getAdvantageById);

// 📌 Update procurement advantage (POST)
router.post("/update/:id", auth, advantageController.updateAdvantage);

// 📌 Ջնջել procurement advantage
router.post("/remove/:id", auth, advantageController.deleteAdvantage);

// 📌 Update / create / delete advantages
router.post("/update-advantages/:id", auth, advantageController.updateAdvantages);

module.exports = router;
