const express = require("express");
const router = express.Router();
const contactLinksController = require("../controllers/contacts_links");
const { auth } = require("../middlewares/auth");

// 📌 Բոլոր contact links
router.get("/", auth, contactLinksController.getAllContactLinks);

router.get("/create", auth, (req, res) => {
  res.render("contacts_links/create", {
    title: "Create Contact Links",
    contactLink: { links: [] },
    user: req.session.user,
    layout: "base",
  });
});

router.post("/create", auth, contactLinksController.createContactLinks);
router.get("/edit/:id", auth, contactLinksController.getContactLinksById);
router.post("/update/:id", auth, contactLinksController.updateContactLinks);
router.post("/remove/:id", auth, contactLinksController.deleteContactLinks);
router.post("/update-links/:id", auth, contactLinksController.updateLinks);

module.exports = router;
