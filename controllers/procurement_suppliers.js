const { prisma } = require("../prisma/prisma-client");

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.procurement_supplier.findMany({
      include: { products: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    res.render("procurement_suppliers/index", {
      title: "Procurement Suppliers",
      suppliers,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching suppliers");
  }
};

const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.procurement_supplier.findUnique({
      where: { id },
      include: { products: { orderBy: { createdAt: "asc" } } },
    });
    if (!supplier) return res.status(404).send("Supplier not found");

    res.render("procurement_suppliers/update", {
      supplier,
      id,
      title: supplier.title,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching supplier");
  }
};

const createSupplier = async (req, res) => {
  try {
    const body = req.body;
    const products = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/products\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!products[idx]) products[idx] = {};
        products[idx][field] = body[key];
      }
    });

    await prisma.procurement_supplier.create({
      data: {
        title: body.title || "",
        description: body.description || "",
        lang: body.lang || "en",
        products: {
          create: products.map((p) => ({ name: p.name || "" })),
        },
      },
    });

    res.redirect("/admin/procurement_suppliers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating supplier");
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await prisma.procurement_supplier.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        lang: body.lang,
      },
    });

    res.redirect("/admin/procurement_suppliers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.deleteMany({ where: { procurementSupplierId: id } });
    await prisma.procurement_supplier.delete({ where: { id } });

    res.redirect("/admin/procurement_suppliers");
  } catch (err) {
    console.error("Error deleting supplier:", err);
    res.status(500).send("Error deleting supplier");
  }
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const products = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/products\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!products[idx]) products[idx] = {};
        products[idx][field] = body[key];
      }
    });

    const existingProducts = await prisma.product.findMany({
      where: { procurementSupplierId: id },
    });
    const existingIds = existingProducts.map((p) => p.id);

    const submittedIds = products.filter((p) => p.id && p.id.trim() !== "").map((p) => p.id);
    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));
    if (idsToDelete.length > 0) {
      await prisma.product.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const p of products) {
      if (p.id && p.id.trim() !== "") {
        await prisma.product.update({ where: { id: p.id }, data: { name: p.name } });
      } else if (p.name && p.name.trim() !== "") {
        await prisma.product.create({ data: { name: p.name, procurementSupplierId: id } });
      }
    }

    res.redirect(`/admin/procurement_suppliers/edit/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating/creating products");
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  updateProducts,
};
