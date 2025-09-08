const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const btns = await prisma.aboutcompany_btn.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aboutcompany_btn/aboutcompany_btn', {
    btns,
    user,
    title: 'About Company Button',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_btn/create_aboutcompany_btn', {
    error: null,
    user,
    title: 'Create About Company Button',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { btn_text, lang } = req.body;

  if (!btn_text || !lang) {
    return res.render('aboutcompany_btn/create_aboutcompany_btn', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Button',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_btn.create({
    data: { btn_text, lang },
  });

  res.redirect('/admin/aboutcompany_btn'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const btn = await prisma.aboutcompany_btn.findUnique({ where: { id } });

  if (!btn) return res.redirect('/admin/aboutcompany_btn'); 

  res.render('aboutcompany_btn/update_aboutcompany_btn', {
    btn,
    error: null,
    user,
    title: 'Edit About Company Button',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { btn_text } = req.body;

  const btn = await prisma.aboutcompany_btn.findUnique({ where: { id } });

  if (!btn) return res.redirect('/admin/aboutcompany_btn'); 

  if (!btn_text) {
    return res.render('aboutcompany_btn/update_aboutcompany_btn', {
      error: 'All fields are required',
      btn,
      user,
      title: 'Edit About Company Button',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_btn.update({
    where: { id },
    data: { btn_text },
  });

  res.redirect('/admin/aboutcompany_btn'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_btn.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_btn'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
