const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footers_links");
const { auth } = require("../middlewares/auth");

router.get("/", auth, footerController.getAllFooterLinks);

router.get("/create", auth, (req, res) => {
  res.render("footers_links/create", {
    title: "Create Footer Link",
    footer: { links: [] },
    user: req.session.user,
    layout: "base",
  });
});

router.post("/create", auth, footerController.createFooterLink);
router.get("/edit/:id", auth, footerController.getFooterLinkById);
router.post("/update/:id", auth, footerController.updateData);
router.post("/remove/:id", auth, footerController.deleteFooter);
router.post("/update-links/:id", auth, footerController.updateLinks);

module.exports = router;
