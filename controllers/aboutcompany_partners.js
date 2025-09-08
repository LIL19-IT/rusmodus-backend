const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const partners = await prisma.aboutcompany_partners.findMany({
    orderBy: { createdAt: 'asc' }
  });
  res.render('aboutcompany_partners/aboutcompany_partners', {
    partners,
    user,
    title: 'About Company Partners',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_partners/create_aboutcompany_partners', {
    error: null,
    user,
    title: 'Create About Company Partner',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, description, btn_text, img_url, lang } = req.body;

  if (!title || !description || !btn_text || !img_url || !lang) {
    return res.render('aboutcompany_partners/create_aboutcompany_partners', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Partner',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_partners.create({
    data: { title, description, btn_text, img_url, lang },
  });

  res.redirect('/admin/aboutcompany_partners'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const partner = await prisma.aboutcompany_partners.findUnique({ where: { id } });

  if (!partner) return res.redirect('/admin/aboutcompany_partners'); 

  res.render('aboutcompany_partners/update_aboutcompany_partners', {
    partner,
    error: null,
    user,
    title: 'Edit About Company Partner',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, description, btn_text, img_url } = req.body;

  const partner = await prisma.aboutcompany_partners.findUnique({ where: { id } });

  if (!partner) return res.redirect('/admin/aboutcompany_partners'); 

  if (!title || !description || !btn_text || !img_url) {
    return res.render('aboutcompany_partners/update_aboutcompany_partners', {
      error: 'All fields are required',
      partner,
      user,
      title: 'Edit About Company Partner',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_partners.update({
    where: { id },
    data: { title, description, btn_text, img_url },
  });

  res.redirect('/admin/aboutcompany_partners'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_partners.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_partners'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
