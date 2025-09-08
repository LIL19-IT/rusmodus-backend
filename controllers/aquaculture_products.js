const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const products = await prisma.aquaculture_product.findMany({
    include: { category: true, contents: true },
    orderBy: { createdAt: 'asc' }
  });

  res.render('aquaculture_products/aquaculture_products', {
    products,
    user,
    title: 'Aquaculture Products',
    layout: 'base',
  });
};

const create_page = async (req, res) => {
  const user = req.session.user;
  const categories = await prisma.aquaculture_categories.findMany();

  res.render('aquaculture_products/create_aquaculture_products', {
    error: null,
    product: {},
    categories,
    user,
    title: 'Create Aquaculture Product',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const { name, description, img_url, lang, category_name } = req.body;
  const user = req.session.user;
  const categories = await prisma.aquaculture_categories.findMany();

  if (!name || !description || !img_url || !lang || !category_name) {
    return res.render('aquaculture_products/create_aquaculture_products', {
      error: 'Please fill all fields',
      product: req.body,
      categories,
      user,
      title: 'Create Aquaculture Product',
      layout: 'base',
    });
  }

  const existingProduct = await prisma.aquaculture_product.findUnique({
    where: { name },
  });

  if (existingProduct) {
    return res.render('aquaculture_products/create_aquaculture_products', {
      error: 'Product with this name already exists',
      product: req.body,
      categories,
      user,
      title: 'Create Aquaculture Product',
      layout: 'base',
    });
  }

  await prisma.aquaculture_product.create({
    data: { name, description, img_url, lang, category_name }
  });

  res.redirect('/admin/aquaculture_products'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const product = await prisma.aquaculture_product.findUnique({ where: { id } });
  const categories = await prisma.aquaculture_categories.findMany();

  if (!product) return res.redirect('/admin/aquaculture_products');

  res.render('aquaculture_products/update_aquaculture_products', {
    product,
    categories,
    error: null,
    user,
    title: 'Update Aquaculture Product',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const { name, description, img_url, category_name } = req.body;
  const user = req.session.user;
  const categories = await prisma.aquaculture_categories.findMany();

  if (!name || !description || !img_url || !category_name) {
    return res.render('aquaculture_products/update_aquaculture_products', {
      error: 'Please fill all fields',
      product: { ...req.body, id },
      categories,
      user,
      title: 'Update Aquaculture Product',
      layout: 'base',
    });
  }

  await prisma.aquaculture_product.update({
    where: { id },
    data: { name, description, img_url, category_name }
  });

  res.redirect('/admin/aquaculture_products'); 
};

const remove = async (req, res) => {
  const id = req.params.id;
  await prisma.aquaculture_product.delete({ where: { id } });
  res.redirect('/admin/aquaculture_products'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove
};
