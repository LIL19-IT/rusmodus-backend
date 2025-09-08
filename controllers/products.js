const { prisma } = require('../prisma/prisma-client');

// Create Page
const create_page = async (req, res) => {
  const user = req.session.user;

  // Քաշում ենք բոլոր suppliers, որպեսզի select-ում ցուցադրվեն
  const suppliers = await prisma.procurement_supplier.findMany({
    orderBy: { createdAt: 'asc' },
  });

  res.render('products/create_products', {
    user,
    suppliers,
    product: {},
    title: 'Add Product',
    layout: 'base',
    error: null,
  });
};

// Add Product
const add = async (req, res) => {
  const user = req.session.user;
  const { name, procurementSupplierId } = req.body;

  if (!name || !procurementSupplierId) {
    const suppliers = await prisma.procurement_supplier.findMany({ orderBy: { createdAt: 'asc' } });
    return res.render('products/create_products', {
      user,
      suppliers,
      product: req.body,
      title: 'Add Product',
      layout: 'base',
      error: 'Please fill all fields.',
    });
  }

  await prisma.product.create({
    data: {
      name,
      procurementSupplierId, // այստեղ պետք է ստացվի form-ից
    },
  });

  res.redirect(`/admin/procurement_suppliers`);
};

// Edit Page
const edit_page = async (req, res) => {
  const id = req.params.id;
  const user = req.session.user;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.redirect('/admin/procurement_suppliers');

  const suppliers = await prisma.procurement_supplier.findMany({ orderBy: { createdAt: 'asc' } });

  res.render('products/update_products', {
    user,
    suppliers,
    product,
    title: 'Edit Product',
    layout: 'base',
    error: null,
  });
};

// Edit Product
const edit = async (req, res) => {
  const id = req.params.id;
  const user = req.session.user;
  const { name, procurementSupplierId } = req.body;

  if (!name || !procurementSupplierId) {
    const suppliers = await prisma.procurement_supplier.findMany({ orderBy: { createdAt: 'asc' } });
    return res.render('products/update_products', {
      user,
      suppliers,
      product: { ...req.body, id },
      title: 'Edit Product',
      layout: 'base',
      error: 'Please fill all fields.',
    });
  }

  await prisma.product.update({
    where: { id },
    data: { name, procurementSupplierId },
  });

  res.redirect(`/admin/procurement_suppliers`);
};

// Remove Product
const remove = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.redirect('/admin/procurement_suppliers');

  await prisma.product.delete({ where: { id } });
  res.redirect(`/admin/procurement_suppliers`);
};

module.exports = { create_page, add, edit_page, edit, remove };
