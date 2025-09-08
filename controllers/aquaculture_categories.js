const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const categories = await prisma.aquaculture_categories.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aquaculture_categories/aquaculture_categories', {
    categories,
    user,
    title: 'Aquaculture Categories',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aquaculture_categories/create_aquaculture_categories', {
    title: 'Create Aquaculture Category',
    user,
    error: null,
    item: {},
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { name, img_url, lang } = req.body;

  if (!name || !img_url || !lang) {
    return res.render('aquaculture_categories/create_aquaculture_categories', {
      error: 'All fields are required',
      user,
      title: 'Create Aquaculture Category',
      item: { name, img_url, lang },
      layout: 'base',
    });
  }

  try {
    await prisma.aquaculture_categories.create({
      data: { name, img_url, lang },
    });
    res.redirect('/admin/aquaculture_categories'); 
  } catch (error) {
    res.render('aquaculture_categories/create_aquaculture_categories', {
      error: 'An error occurred while creating the category',
      user,
      title: 'Create Aquaculture Category',
      item: { name, img_url, lang },
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const category = await prisma.aquaculture_categories.findUnique({ where: { id } });

  if (!category) return res.redirect('/admin/aquaculture_categories'); 

  res.render('aquaculture_categories/update_aquaculture_categories', {
    category,
    error: null,
    user,
    title: 'Edit Aquaculture Category',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { name, img_url } = req.body;

  const category = await prisma.aquaculture_categories.findUnique({ where: { id } });

  if (!category) return res.redirect('/admin/aquaculture_categories'); 

  if (!name || !img_url) {
    return res.render('aquaculture_categories/update_aquaculture_categories', {
      error: 'All fields are required',
      category,
      user,
      title: 'Edit Aquaculture Category',
      layout: 'base',
    });
  }

  try {
    await prisma.aquaculture_categories.update({
      where: { id },
      data: { name, img_url },
    });
    res.redirect('/admin/aquaculture_categories'); 
  } catch (err) {
    res.render('aquaculture_categories/update_aquaculture_categories', {
      error: 'Category name must be unique',
      category,
      user,
      title: 'Edit Aquaculture Category',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aquaculture_categories.delete({
    where: { id },
  });

  res.redirect('/admin/aquaculture_categories'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
