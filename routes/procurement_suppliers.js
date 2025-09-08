const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/procurement_suppliers");
const { auth } = require("../middlewares/auth");
router.get("/", auth, supplierController.getAllSuppliers);

router.get("/create", auth, (req, res) => {
  res.render("procurement_suppliers/create", {
    title: "Create Supplier",
    supplier: { products: [] },
    user: req.session.user,
    layout: "base",
  });
});

router.post("/create", auth, supplierController.createSupplier);
router.get("/edit/:id", auth, supplierController.getSupplierById);
router.post("/update/:id", auth, supplierController.updateSupplier);
router.post("/remove/:id", auth, supplierController.deleteSupplier);
router.post("/update-products/:id", auth, supplierController.updateProducts);

module.exports = router;
