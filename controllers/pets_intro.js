const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const intros = await prisma.pets_intro.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('pets_intro/pets_intro', {
    intros,
    user,
    title: 'Pets Intro List',
    layout: 'base',
  });
};

const create_page = async (req, res) => {
  const user = req.session.user;

  res.render('pets_intro/create_pets_intro', {
    intro: {},
    error: null,
    user,
    title: 'Create Pets Intro',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, sub_title, route, sub_title1, video_src, lang } = req.body;

  if (!title || !route || !lang) {
    return res.render('pets_intro/create_pets_intro', {
      intro: req.body,
      error: 'Title, route, and language are required.',
      user,
      title: 'Create Pets Intro',
      layout: 'base',
    });
  }

  try {
    await prisma.pets_intro.create({
      data: { title, sub_title, route, sub_title1, video_src, lang },
    });
    res.redirect('/admin/pets_intro'); 
  } catch (err) {
    res.render('pets_intro/create_pets_intro', {
      intro: req.body,
      error: 'Error creating intro. Please check the data.',
      user,
      title: 'Create Pets Intro',
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const intro = await prisma.pets_intro.findUnique({ where: { id } });
  if (!intro) return res.redirect('/admin/pets_intro'); 

  res.render('pets_intro/update_pets_intro', {
    intro,
    error: null,
    user,
    title: 'Edit Pets Intro',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, sub_title, route, sub_title1, video_src } = req.body;

  if (!title || !route) {
    return res.render('pets_intro/update_pets_intro', {
      intro: { ...req.body, id },
      error: 'Title, route, and language are required.',
      user,
      title: 'Edit Pets Intro',
      layout: 'base',
    });
  }

  try {
    await prisma.pets_intro.update({
      where: { id },
      data: { title, sub_title, route, sub_title1, video_src },
    });
    res.redirect('/admin/pets_intro');
  } catch (err) {
    res.render('pets_intro/update_pets_intro', {
      intro: { ...req.body, id },
      error: 'Error updating intro. Please check the data.',
      user,
      title: 'Edit Pets Intro',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.pets_intro.delete({ where: { id } });
  res.redirect('/admin/pets_intro'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
