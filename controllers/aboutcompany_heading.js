const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const headings = await prisma.aboutcompany_heading.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aboutcompany_heading/aboutcompany_heading', {
    headings,
    user,
    title: 'About Company Heading',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_heading/create_aboutcompany_heading', {
    error: null,
    user,
    title: 'Create About Company Heading',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, lang } = req.body;

  if (!title || !lang) {
    return res.render('aboutcompany_heading/create_aboutcompany_heading', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Heading',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_heading.create({
    data: { title, lang },
  });

  res.redirect('/admin/aboutcompany_heading'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const heading = await prisma.aboutcompany_heading.findUnique({ where: { id } });

  if (!heading) return res.redirect('/admin/aboutcompany_heading'); 

  res.render('aboutcompany_heading/update_aboutcompany_heading', {
    heading,
    error: null,
    user,
    title: 'Edit About Company Heading',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title } = req.body;

  const heading = await prisma.aboutcompany_heading.findUnique({ where: { id } });

  if (!heading) return res.redirect('/admin/aboutcompany_heading');

  if (!title) {
    return res.render('aboutcompany_heading/update_aboutcompany_heading', {
      error: 'All fields are required',
      heading,
      user,
      title: 'Edit About Company Heading',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_heading.update({
    where: { id },
    data: { title },
  });

  res.redirect('/admin/aboutcompany_heading'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_heading.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_heading'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
