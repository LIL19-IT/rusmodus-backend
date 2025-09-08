const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const languages = await prisma.language.findMany({
    orderBy: { createdAt: 'asc' }
  });
  res.render('language/language', {
    languages,
    user,
    title: 'Languages',
    layout: 'base'
  });
};

const create_page = async (req, res) => {
  const user = req.session.user;
  res.render('language/create_language', {
    error: null,
    user,
    title: 'Create Language',
    layout: 'base'
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { label } = req.body;

  if (!label) {
    return res.render('language/create_language', {
      error: 'Please fill in the label field',
      user,
      title: 'Create Language',
      layout: 'base'
    });
  }

  await prisma.language.create({ data: { label } });

  res.redirect('/admin/language'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const language = await prisma.language.findUnique({ where: { id } });
  if (!language) return res.redirect('/admin/language'); 

  res.render('language/update_language', {
    language,
    error: null,
    user,
    title: 'Update Language',
    layout: 'base'
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { label } = req.body;

  const language = await prisma.language.findUnique({ where: { id } });
  if (!language) return res.redirect('/admin/language'); 

  if (!label) {
    return res.render('language/update_language', {
      error: 'Please fill in the label field',
      language,
      user,
      title: 'Update Language',
      layout: 'base'
    });
  }

  await prisma.language.update({
    where: { id },
    data: { label }
  });

  res.redirect('/admin/language'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.language.delete({ where: { id } });
  res.redirect('/admin/language'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove
};
