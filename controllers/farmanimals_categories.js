const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const categories = await prisma.farmanimals_category.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('farmanimals_categories/farmanimals_categories', {
    categories,
    user,
    title: 'Farm Animals Categories',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('farmanimals_categories/create_farmanimals_categories', {
    error: null,
    category: {},
    user,
    title: 'Create Farm Animals Category',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { name, img_url, lang } = req.body;

  if (!name || !img_url || !lang) {
    return res.render('farmanimals_categories/create_farmanimals_categories', {
      error: 'All fields are required',
      category: req.body,
      user,
      title: 'Create Farm Animals Category',
      layout: 'base',
    });
  }

  await prisma.farmanimals_category.create({
    data: { name, img_url, lang },
  });

  res.redirect('/admin/farmanimals_categories'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const category = await prisma.farmanimals_category.findUnique({ where: { id } });
  if (!category) return res.redirect('/admin/farmanimals_categories'); 

  res.render('farmanimals_categories/update_farmanimals_categories', {
    category,
    error: null,
    user,
    title: 'Edit Farm Animals Category',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { name, img_url } = req.body;

  const category = await prisma.farmanimals_category.findUnique({ where: { id } });

  if (!category) return res.redirect('/admin/farmanimals_categories'); 

  if (!name || !img_url) {
    return res.render('farmanimals_categories/update_farmanimals_categories', {
      error: 'All fields are required',
      category,
      user,
      title: 'Edit Farm Animals Category',
      layout: 'base',
    });
  }

  await prisma.farmanimals_category.update({
    where: { id },
    data: { name, img_url },
  });

  res.redirect('/admin/farmanimals_categories'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.farmanimals_category.delete({ where: { id } });

  res.redirect('/admin/farmanimals_categories'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
