const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const products = await prisma.farmanimals_product.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('farmanimals_products/farmanimals_products', {
    products,
    user,
    title: 'Farm Animals Products',
    layout: 'base',
  });
};

const create_page = async (req, res) => {
  const user = req.session.user;
  res.render('farmanimals_products/create_farmanimals_products', {
    error: null,
    product: {},
    user,
    title: 'Create Farm Animal Product',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { name, description, img_url, lang, category_name } = req.body;

  if (!name || !description || !img_url || !lang || !category_name) {
    return res.render('farmanimals_products/create_farmanimals_products', {
      error: 'All fields are required',
      product: req.body,
      user,
      title: 'Create Farm Animal Product',
      layout: 'base',
    });
  }

  try {
    await prisma.farmanimals_product.create({
      data: { name, description, img_url, lang, category_name },
    });
    res.redirect('/admin/farmanimals_products'); 
  } catch (error) {
    console.error(error);
    let message = 'Error creating product. Please try again.';
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      message = 'Error: A product with this name already exists.';
    }
    res.render('farmanimals_products/create_farmanimals_products', {
      error: message,
      product: req.body,
      user,
      title: 'Create Farm Animal Product',
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const product = await prisma.farmanimals_product.findUnique({ where: { id } });
  if (!product) return res.redirect('/admin/farmanimals_products'); 
  res.render('farmanimals_products/update_farmanimals_products', {
    product,
    error: null,
    user,
    title: 'Edit Farm Animal Product',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { name, description, img_url, category_name } = req.body;

  const product = await prisma.farmanimals_product.findUnique({ where: { id } });
  if (!product) return res.redirect('/admin/farmanimals_products'); 

  if (!name || !description || !img_url || !category_name) {
    return res.render('farmanimals_products/update_farmanimals_products', {
      error: 'All fields are required',
      product: { ...req.body, id },
      user,
      title: 'Edit Farm Animal Product',
      layout: 'base',
    });
  }

  try {
    await prisma.farmanimals_product.update({
      where: { id },
      data: { name, description, img_url, category_name },
    });
    res.redirect('/admin/farmanimals_products'); 
  } catch (error) {
    console.error(error);
    let message = 'Error updating product. Please try again.';
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      message = 'Error: A product with this name already exists.';
    }
    res.render('farmanimals_products/update_farmanimals_products', {
      error: message,
      product: { ...req.body, id },
      user,
      title: 'Edit Farm Animal Product',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.farmanimals_product.delete({ where: { id } });
  } catch (error) {
    console.error(error);
  }
  res.redirect('/admin/farmanimals_products'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
