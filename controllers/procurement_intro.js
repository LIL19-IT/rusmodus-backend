const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const intros = await prisma.procurement_intro.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('procurement_intro/procurement_intro', {
    intros,
    user,
    title: 'Procurement Intro',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('procurement_intro/create_procurement_intro', {
    error: null,
    user,
    title: 'Create Procurement Intro',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, sub_title, route, sub_title1, img_url, lang } = req.body;

  if (!title || !sub_title || !route || !sub_title1 || !img_url || !lang) {
    return res.render('procurement_intro/create_procurement_intro', {
      error: 'All fields are required',
      user,
      title: 'Create Procurement Intro',
      layout: 'base',
    });
  }

  await prisma.procurement_intro.create({
    data: { title, sub_title, route, sub_title1, img_url, lang },
  });

  res.redirect('/admin/procurement_intro');
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const intro = await prisma.procurement_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/procurement_intro');

  res.render('procurement_intro/update_procurement_intro', {
    intro,
    error: null,
    user,
    title: 'Edit Procurement Intro',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, sub_title, route, sub_title1, img_url } = req.body;

  const intro = await prisma.procurement_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/procurement_intro');

  if (!title || !sub_title || !route || !sub_title1 || !img_url) {
    return res.render('procurement_intro/update_procurement_intro', {
      error: 'All fields are required',
      intro,
      user,
      title: 'Edit Procurement Intro',
      layout: 'base',
    });
  }

  await prisma.procurement_intro.update({
    where: { id },
    data: { title, sub_title, route, sub_title1, img_url },
  });

  res.redirect('/admin/procurement_intro');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.procurement_intro.delete({ where: { id } });

  res.redirect('/admin/procurement_intro');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
