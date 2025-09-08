const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const sortOptions = await prisma.aquaculture_sortOptions.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aquaculture_sortOptions/aquaculture_sortOptions', {
    sortOptions,
    user,
    title: 'Aquaculture Sort Options',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aquaculture_sortOptions/create_aquaculture_sortOptions', {
    error: null,
    user,
    title: 'Create Aquaculture Sort Option',
    layout: 'base',
    formAction: '/admin/aquaculture_sortOptions/create', 
    buttonText: 'Create',
    sortOption: { name: '', lang: '' },
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { name, lang } = req.body;

  if (!name || !lang) {
    return res.render('aquaculture_sortOptions/create_aquaculture_sortOptions', {
      error: 'All fields are required',
      user,
      title: 'Create Aquaculture Sort Option',
      layout: 'base',
      formAction: '/admin/aquaculture_sortOptions/create', 
      buttonText: 'Create',
      sortOption: { name: name || '', lang: lang || '' },
    });
  }

  await prisma.aquaculture_sortOptions.create({ data: { name, lang } });

  res.redirect('/admin/aquaculture_sortOptions'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const sortOption = await prisma.aquaculture_sortOptions.findUnique({ where: { id } });

  if (!sortOption) return res.redirect('/admin/aquaculture_sortOptions'); 

  res.render('aquaculture_sortOptions/update_aquaculture_sortOptions', {
    sortOption,
    error: null,
    user,
    title: 'Edit Aquaculture Sort Option',
    layout: 'base',
    formAction: `/admin/aquaculture_sortOptions/edit/${id}`, 
    buttonText: 'Update',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { name } = req.body;

  const sortOption = await prisma.aquaculture_sortOptions.findUnique({ where: { id } });

  if (!sortOption) return res.redirect('/admin/aquaculture_sortOptions'); 

  if (!name ) {
    return res.render('aquaculture_sortOptions/update_aquaculture_sortOptions', {
      error: 'All fields are required',
      sortOption: { id, name: name || ''},
      user,
      title: 'Edit Aquaculture Sort Option',
      layout: 'base',
      formAction: `/admin/aquaculture_sortOptions/edit/${id}`, 
      buttonText: 'Update',
    });
  }

  await prisma.aquaculture_sortOptions.update({ where: { id }, data: { name } });

  res.redirect('/admin/aquaculture_sortOptions'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aquaculture_sortOptions.delete({ where: { id } });

  res.redirect('/admin/aquaculture_sortOptions'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
