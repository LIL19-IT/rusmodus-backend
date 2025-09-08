const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const sortOptions = await prisma.farmanimals_sortOption.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('farmanimals_sortOption/farmanimals_sortOption', {
    sortOptions,
    user,
    title: 'Farm Animals Sort Options',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;
  res.render('farmanimals_sortOption/create_farmanimals_sortOption', {
    error: null,
    sortOption: {},
    user,
    title: 'Create Sort Option',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const { name, lang } = req.body;
  const user = req.session.user;

  if (!name || !lang) {
    return res.render('farmanimals_sortOption/create_farmanimals_sortOption', {
      error: 'All fields are required',
      sortOption: req.body,
      user,
      title: 'Create Sort Option',
      layout: 'base',
    });
  }

  await prisma.farmanimals_sortOption.create({
    data: { name, lang },
  });

  res.redirect('/admin/farmanimals_sortOption');
};

const edit_page = async (req, res) => {
  const id = req.params.id;
  const user = req.session.user;

  const sortOption = await prisma.farmanimals_sortOption.findUnique({ where: { id } });
  if (!sortOption) return res.redirect('/admin/farmanimals_sortOption');

  res.render('farmanimals_sortOption/update_farmanimals_sortOption', {
    sortOption,
    error: null,
    user,
    title: 'Edit Sort Option',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const user = req.session.user;

  const sortOption = await prisma.farmanimals_sortOption.findUnique({ where: { id } });
  if (!sortOption) return res.redirect('/admin/farmanimals_sortOption');

  if (!name) {
    return res.render('farmanimals_sortOption/update_farmanimals_sortOption', {
      error: 'All fields are required',
      sortOption,
      user,
      title: 'Edit Sort Option',
      layout: 'base',
    });
  }

  await prisma.farmanimals_sortOption.update({
    where: { id },
    data: { name },
  });

  res.redirect('/admin/farmanimals_sortOption');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.farmanimals_sortOption.delete({ where: { id } });

  res.redirect('/admin/farmanimals_sortOption');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
