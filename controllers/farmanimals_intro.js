const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const intros = await prisma.farmanimals_intro.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('farmanimals_intro/farmanimals_intro', {
    intros,
    user,
    title: 'Farm Animals Intro',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('farmanimals_intro/create_farmanimals_intro', {
    error: null,
    intro: {},
    user,
    title: 'Create Farm Animals Intro',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, sub_title, route, sub_title1, video_src, lang } = req.body;

  if (!title || !sub_title || !route || !sub_title1 || !video_src || !lang) {
    return res.render('farmanimals_intro/create_farmanimals_intro', {
      error: 'All fields are required',
      user,
      title: 'Create Farm Animals Intro',
      layout: 'base',
      intro: req.body,
    });
  }

  await prisma.farmanimals_intro.create({
    data: { title, sub_title, route, sub_title1, video_src, lang },
  });

  res.redirect('/admin/farmanimals_intro'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const intro = await prisma.farmanimals_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/farmanimals_intro'); 

  res.render('farmanimals_intro/update_farmanimals_intro', {
    intro,
    error: null,
    user,
    title: 'Edit Farm Animals Intro',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, sub_title, route, sub_title1, video_src } = req.body;

  const intro = await prisma.farmanimals_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/farmanimals_intro'); 

  if (!title || !sub_title || !route || !sub_title1 || !video_src) {
    return res.render('farmanimals_intro/update_farmanimals_intro', {
      error: 'All fields are required',
      intro,
      user,
      title: 'Edit Farm Animals Intro',
      layout: 'base',
    });
  }

  await prisma.farmanimals_intro.update({
    where: { id },
    data: { title, sub_title, route, sub_title1, video_src },
  });

  res.redirect('/admin/farmanimals_intro'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.farmanimals_intro.delete({
    where: { id },
  });

  res.redirect('/admin/farmanimals_intro'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
