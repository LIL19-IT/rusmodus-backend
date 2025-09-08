const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const datas = await prisma.aboutcompany_data.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aboutcompany_data/aboutcompany_data', {
    datas,
    user,
    title: 'About Company Data',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_data/create_aboutcompany_data', {
    error: null,
    user,
    title: 'Create About Company Data',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { img_url, sub_title, description, lang } = req.body;

  if (!img_url || !sub_title || !description || !lang) {
    return res.render('aboutcompany_data/create_aboutcompany_data', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Data',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_data.create({
    data: { img_url, sub_title, description, lang },
  });

  res.redirect('/admin/aboutcompany_data'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const data = await prisma.aboutcompany_data.findUnique({ where: { id } });

  if (!data) return res.redirect('/admin/aboutcompany_data'); 

  res.render('aboutcompany_data/update_aboutcompany_data', {
    data,
    error: null,
    user,
    title: 'Edit About Company Data',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { img_url, sub_title, description } = req.body;

  const data = await prisma.aboutcompany_data.findUnique({ where: { id } });

  if (!data) return res.redirect('/admin/aboutcompany_data'); 

  if (!img_url || !sub_title || !description) {
    return res.render('aboutcompany_data/update_aboutcompany_data', {
      error: 'All fields are required',
      data,
      user,
      title: 'Edit About Company Data',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_data.update({
    where: { id },
    data: { img_url, sub_title, description },
  });

  res.redirect('/admin/aboutcompany_data');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_data.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_data'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
