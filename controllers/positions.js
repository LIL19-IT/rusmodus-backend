const { prisma } = require('../prisma/prisma-client');

const create_page = async (req, res) => {
  const user = req.session.user;

  const vacancies = await prisma.aboutcompany_vacancy.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('positions/create_positions', {
    user,
    vacancies,
    title: 'Add Position',
    layout: 'base',
    error: null,
  });
};

const add = async (req, res) => {
  const { vacancyId, title, location, description, url_text, url_link } = req.body;

  if (!vacancyId || !title || !location || !description || !url_text || !url_link) {
    const vacancies = await prisma.aboutcompany_vacancy.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return res.render('positions/create_positions', {
      user: req.session.user,
      vacancies,
      title: 'Add Position',
      layout: 'base',
      error: 'Please fill all fields.',
    });
  }

  await prisma.position.create({
    data: {
      title,
      location,
      description,
      url_text,
      url_link,
      aboutCompanyVacancyId: vacancyId,
    },
  });

  res.redirect('/admin/aboutcompany_vacancies');
};

const edit_page = async (req, res) => {
  const id = req.params.id;
  const position = await prisma.position.findUnique({ where: { id } });
  if (!position) return res.redirect('/admin/aboutcompany_vacancies');

  const vacancies = await prisma.aboutcompany_vacancy.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('positions/update_positions', {
    position,
    vacancies,
    user: req.session.user,
    title: 'Edit Position',
    layout: 'base',
    error: null,
  });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const { vacancyId, title, location, description, url_text, url_link } = req.body;

  if (!vacancyId || !title || !location || !description || !url_text || !url_link) {
    const position = await prisma.position.findUnique({ where: { id } });
    const vacancies = await prisma.aboutcompany_vacancy.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return res.render('positions/update_positions', {
      position,
      vacancies,
      user: req.session.user,
      title: 'Edit Position',
      layout: 'base',
      error: 'Please fill all fields.',
    });
  }

  await prisma.position.update({
    where: { id },
    data: {
      title,
      location,
      description,
      url_text,
      url_link,
      aboutCompanyVacancyId: vacancyId,
    },
  });

  res.redirect('/admin/aboutcompany_vacancies');
};



const remove = async (req, res) => {
  const id = req.params.id;
  const position = await prisma.position.findUnique({ where: { id } });
  if (!position) return res.redirect('/admin/aboutcompany_vacancies');

  await prisma.position.delete({ where: { id } });
  res.redirect('/admin/aboutcompany_vacancies');
};

module.exports = { create_page, add, edit_page, edit, remove };
