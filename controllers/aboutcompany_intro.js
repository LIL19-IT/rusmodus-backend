const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const intros = await prisma.aboutcompany_intro.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aboutcompany_intro/aboutcompany_intro', {
    intros,
    user,
    title: 'About Company Intro',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_intro/create_aboutcompany_intro', {
    error: null,
    user,
    title: 'Create About Company Intro',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, description, sub_title, route, sub_title1, img_url, lang } = req.body;

  if (!title || !description || !sub_title || !route || !sub_title1 || !img_url || !lang) {
    return res.render('aboutcompany_intro/create_aboutcompany_intro', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Intro',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_intro.create({
    data: { title, description, sub_title, route, sub_title1, img_url, lang },
  });

  res.redirect('/admin/aboutcompany_intro'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const intro = await prisma.aboutcompany_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/aboutcompany_intro'); 

  res.render('aboutcompany_intro/update_aboutcompany_intro', {
    intro,
    error: null,
    user,
    title: 'Edit About Company Intro',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, description, sub_title, route, sub_title1, img_url } = req.body;

  const intro = await prisma.aboutcompany_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/aboutcompany_intro'); 

  if (!title || !description || !sub_title || !route || !sub_title1 || !img_url) {
    return res.render('aboutcompany_intro/update_aboutcompany_intro', {
      error: 'All fields are required',
      intro,
      user,
      title: 'Edit About Company Intro',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_intro.update({
    where: { id },
    data: { title, description, sub_title, route, sub_title1, img_url },
  });

  res.redirect('/admin/aboutcompany_intro'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_intro.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_intro'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
