const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const infos = await prisma.aboutcompany_info.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aboutcompany_info/aboutcompany_info', {
    infos,
    user,
    title: 'About Company Info',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_info/create_aboutcompany_info', {
    error: null,
    user,
    title: 'Create About Company Info',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { btn_text, title, description, lang } = req.body;

  if (!btn_text || !title || !description || !lang) {
    return res.render('aboutcompany_info/create_aboutcompany_info', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Info',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_info.create({
    data: { btn_text, title, description, lang },
  });

  res.redirect('/admin/aboutcompany_info'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const info = await prisma.aboutcompany_info.findUnique({ where: { id } });

  if (!info) return res.redirect('/admin/aboutcompany_info'); 

  res.render('aboutcompany_info/update_aboutcompany_info', {
    info,
    error: null,
    user,
    title: 'Edit About Company Info',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { btn_text, title, description } = req.body;

  const info = await prisma.aboutcompany_info.findUnique({ where: { id } });

  if (!info) return res.redirect('/admin/aboutcompany_info'); 

  if (!btn_text || !title || !description) {
    return res.render('aboutcompany_info/update_aboutcompany_info', {
      error: 'All fields are required',
      info,
      user,
      title: 'Edit About Company Info',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_info.update({
    where: { id },
    data: { btn_text, title, description },
  });

  res.redirect('/admin/aboutcompany_info'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_info.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_info'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
