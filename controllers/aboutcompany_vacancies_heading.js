const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const headings = await prisma.aboutcompany_vacancies_heading.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aboutcompany_vacancies_heading/aboutcompany_vacancies_heading', {
    headings,
    user,
    title: 'About Company Vacancies Headings',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_vacancies_heading/create_aboutcompany_vacancies_heading', {
    error: null,
    user,
    title: 'Create About Company Vacancies Heading',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, description, url_text, url_link, lang } = req.body;

  if (!title || !description || !url_text || !url_link || !lang) {
    return res.render('aboutcompany_vacancies_heading/create_aboutcompany_vacancies_heading', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Vacancies Heading',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_vacancies_heading.create({
    data: { title, description, url_text, url_link, lang },
  });

  res.redirect('/admin/aboutcompany_vacancies_heading'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const heading = await prisma.aboutcompany_vacancies_heading.findUnique({ where: { id } });

  if (!heading) return res.redirect('/admin/aboutcompany_vacancies_heading'); 

  res.render('aboutcompany_vacancies_heading/update_aboutcompany_vacancies_heading', {
    heading,
    error: null,
    user,
    title: 'Edit About Company Vacancies Heading',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title, description, url_text, url_link } = req.body;

  const heading = await prisma.aboutcompany_vacancies_heading.findUnique({ where: { id } });

  if (!heading) return res.redirect('/admin/aboutcompany_vacancies_heading'); 

  if (!title || !description || !url_text || !url_link) {
    return res.render('aboutcompany_vacancies_heading/update_aboutcompany_vacancies_heading', {
      error: 'All fields are required',
      heading,
      user,
      title: 'Edit About Company Vacancies Heading',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_vacancies_heading.update({
    where: { id },
    data: { title, description, url_text, url_link },
  });

  res.redirect('/admin/aboutcompany_vacancies_heading'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_vacancies_heading.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_vacancies_heading');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
