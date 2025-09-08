const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const headerLogos = await prisma.header_logo.findMany({
    orderBy: { createdAt: 'asc' }
  });


  res.render('header_logo/header_logo', {
    headerLogos,
    user,
    title: 'Header Logo',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('header_logo/create_header_logo', {
    error: null,
    user,
    title: 'Create Header Logo',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { img_url } = req.body;

  if (!img_url) {
    return res.render('header_logo/create_header_logo', {
      error: 'Image URL is required',
      user,
      title: 'Create Header Logo',
      layout: 'base',
    });
  }

  await prisma.header_logo.create({
    data: { src: img_url },
  });

  res.redirect('/admin/header_logo');
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const headerLogo = await prisma.header_logo.findUnique({ where: { id } });
  if (!headerLogo) return res.redirect('/admin/header_logo');

  res.render('header_logo/update_header_logo', {
    headerLogo,
    error: null,
    user,
    title: 'Edit Header Logo',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { img_url } = req.body;

  const headerLogo = await prisma.header_logo.findUnique({ where: { id } });
  if (!headerLogo) return res.redirect('/admin/header_logo');

  if (!img_url) {
    return res.render('header_logo/update_header_logo', {
      error: 'Image URL is required',
      headerLogo,
      user,
      title: 'Edit Header Logo',
      layout: 'base',
    });
  }

  await prisma.header_logo.update({
    where: { id },
    data: { src: img_url },
  });

  res.redirect('/admin/header_logo');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.header_logo.delete({ where: { id } });
  res.redirect('/admin/header_logo');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
