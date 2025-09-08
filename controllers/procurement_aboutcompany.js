const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const abouts = await prisma.procurement_aboutcompany.findMany({
    orderBy: { createdAt: 'asc'}
  });

  res.render('procurement_aboutcompany/procurement_aboutcompany', {
    abouts,
    user,
    title: 'Procurement About Company',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('procurement_aboutcompany/create_procurement_aboutcompany', {
    error: null,
    user,
    title: 'Create Procurement About Company',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, description, btn_text, route, lang } = req.body;

  if (!title || !description || !btn_text || !route || !lang) {
    return res.render('procurement_aboutcompany/create_procurement_aboutcompany', {
      error: 'All fields are required',
      user,
      title: 'Create Procurement About Company',
      layout: 'base',
    });
  }

  await prisma.procurement_aboutcompany.create({
    data: { title, description, btn_text, route, lang },
  });

  res.redirect('/admin/procurement_aboutcompany'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const about = await prisma.procurement_aboutcompany.findUnique({ where: { id } });

  if (!about) return res.redirect('/admin/procurement_aboutcompany'); 

  res.render('procurement_aboutcompany/update_procurement_aboutcompany', {
    about,
    error: null,
    user,
    title: 'Edit Procurement About Company',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, description, btn_text, route } = req.body;

  const about = await prisma.procurement_aboutcompany.findUnique({ where: { id } });

  if (!about) return res.redirect('/admin/procurement_aboutcompany'); 

  if (!title || !description || !btn_text || !route) {
    return res.render('procurement_aboutcompany/update_procurement_aboutcompany', {
      error: 'All fields are required',
      about,
      user,
      title: 'Edit Procurement About Company',
      layout: 'base',
    });
  }

  await prisma.procurement_aboutcompany.update({
    where: { id },
    data: { title, description, btn_text, route },
  });

  res.redirect('/admin/procurement_aboutcompany'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.procurement_aboutcompany.delete({
    where: { id },
  });

  res.redirect('/admin/procurement_aboutcompany'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
