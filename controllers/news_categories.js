const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const categories = await prisma.news_categories.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('news_categories/news_categories', {
    categories,
    user,
    title: 'News Categories',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('news_categories/create_news_categories', {
    error: null,
    user,
    title: 'Create News Category',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { name, lang } = req.body;

  if (!name || !lang) {
    return res.render('news_categories/create_news_categories', {
      error: 'All fields are required',
      user,
      title: 'Create News Category',
      layout: 'base',
    });
  }

  await prisma.news_categories.create({
    data: { name, lang },
  });

  res.redirect('/admin/news_categories');
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const category = await prisma.news_categories.findUnique({ where: { id } });

  if (!category) return res.redirect('/admin/news_categories');

  res.render('news_categories/update_news_categories', {
    category,
    error: null,
    user,
    title: 'Edit News Category',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { name } = req.body;

  const category = await prisma.news_categories.findUnique({ where: { id } });

  if (!category) return res.redirect('/admin/news_categories');

  if (!name) {
    return res.render('news_categories/update_news_categories', {
      error: 'All fields are required',
      category,
      user,
      title: 'Edit News Category',
      layout: 'base',
    });
  }

  await prisma.news_categories.update({
    where: { id },
    data: { name },
  });

  res.redirect('/admin/news_categories');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.news_categories.delete({
    where: { id },
  });

  res.redirect('/admin/news_categories');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
