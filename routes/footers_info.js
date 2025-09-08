const express = require("express");
const router = express.Router();
const footersInfoController = require("../controllers/footers_info");
const { auth } = require("../middlewares/auth");

router.get("/", auth, footersInfoController.getAllFootersInfo);

router.get("/create", auth, (req, res) => {
  res.render("footers_info/create", {
    title: "Create Footer Info",
    footer: { social_links: [] },
    user: req.session.user,
    layout: "base",
  });
});

router.post("/create", auth, footersInfoController.createFooterInfo);
router.get("/edit/:id", auth, footersInfoController.getFooterInfoById);
router.post("/update/:id", auth, footersInfoController.updateData);
router.post("/remove/:id", auth, footersInfoController.deleteFooterInfo);
router.post("/update-social-links/:id", auth, footersInfoController.updateSocialLinks);

module.exports = router;
