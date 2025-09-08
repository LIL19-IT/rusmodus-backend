const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const intros = await prisma.aquaculture_intro.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aquaculture_intro/aquaculture_intro', {
    intros,
    user,
    title: 'Aquaculture Intro',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aquaculture_intro/create_aquaculture_intro', {
    error: null,
    user,
    title: 'Create Aquaculture Intro',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, sub_title, route, sub_title1, video_src, lang } = req.body;

  if (!title || !sub_title || !route || !sub_title1 || !video_src || !lang) {
    return res.render('aquaculture_intro/create_aquaculture_intro', {
      error: 'All fields are required',
      user,
      title: 'Create Aquaculture Intro',
      layout: 'base',
    });
  }

  await prisma.aquaculture_intro.create({
    data: { title, sub_title, route, sub_title1, video_src, lang },
  });

  res.redirect('/admin/aquaculture_intro'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const intro = await prisma.aquaculture_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/aquaculture_intro');

  res.render('aquaculture_intro/update_aquaculture_intro', {
    intro,
    error: null,
    user,
    title: 'Edit Aquaculture Intro',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, sub_title, route, sub_title1, video_src } = req.body;

  const intro = await prisma.aquaculture_intro.findUnique({ where: { id } });

  if (!intro) return res.redirect('/admin/aquaculture_intro');

  if (!title || !sub_title || !route || !sub_title1 || !video_src) {
    return res.render('aquaculture_intro/update_aquaculture_intro', {
      error: 'All fields are required',
      intro,
      user,
      title: 'Edit Aquaculture Intro',
      layout: 'base',
    });
  }

  await prisma.aquaculture_intro.update({
    where: { id },
    data: { title, sub_title, route, sub_title1, video_src },
  });

  res.redirect('/admin/aquaculture_intro'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aquaculture_intro.delete({ where: { id } });

  res.redirect('/admin/aquaculture_intro'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
