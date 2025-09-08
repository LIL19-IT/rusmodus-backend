const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const vacancies = await prisma.aboutcompany_vacancy.findMany({
    include: { positions: true },
    orderBy: { createdAt: 'asc' },
  });

  res.render('aboutcompany_vacancies/aboutcompany_vacancies', {
    vacancies,
    user,
    title: 'About Company Vacancies',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;
  res.render('aboutcompany_vacancies/create_aboutcompany_vacancies', {
    vacancy: {},
    user,
    title: 'Create Vacancy',
    layout: 'base',
    error: null,
  });
};

const add = async (req, res) => {
  const { category, lang, positions } = req.body;

  if (!category || !lang) {
    return res.render('aboutcompany_vacancies/create_aboutcompany_vacancies', {
      error: 'Please fill all required fields',
      vacancy: req.body,
      user: req.session.user,
      title: 'Create Vacancy',
      layout: 'base',
    });
  }

  const safePositions = Array.isArray(positions) ? positions : positions ? [positions] : [];

  await prisma.aboutcompany_vacancy.create({
    data: {
      category,
      lang,
      positions: {
        create: safePositions.map(p => ({
          title: p.title || '',
          location: p.location || '',
          description: p.description || '',
          url_text: p.url_text || '',
          url_link: p.url_link || '',
        })),
      },
    },
  });

  res.redirect('/admin/aboutcompany_vacancies');
};

const edit_page = async (req, res) => {
  const id = req.params.id;
  const vacancy = await prisma.aboutcompany_vacancy.findUnique({
    where: { id },
    include: { positions: true },
  });
  if (!vacancy) return res.redirect('/admin/aboutcompany_vacancies');

  res.render('aboutcompany_vacancies/update_aboutcompany_vacancies', {
    vacancy,
    user: req.session.user,
    title: 'Update Vacancy',
    layout: 'base',
    error: null,
  });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const { category, positions } = req.body;

  const vacancy = await prisma.aboutcompany_vacancy.findUnique({ where: { id } });
  if (!vacancy) return res.redirect('/admin/aboutcompany_vacancies');

  if (!category) {
    return res.render('aboutcompany_vacancies/update_aboutcompany_vacancies', {
      error: 'Please fill all required fields',
      vacancy: { ...vacancy, ...req.body },
      user: req.session.user,
      title: 'Update Vacancy',
      layout: 'base',
    });
  }

  const safePositions = Array.isArray(positions) ? positions : positions ? [positions] : [];

  await prisma.$transaction([
    prisma.position.deleteMany({ where: { aboutCompanyVacancyId: id } }),
    prisma.aboutcompany_vacancy.update({
      where: { id },
      data: {
        category,
        positions: {
          create: safePositions.map(p => ({
            title: p.title || '',
            location: p.location || '',
            description: p.description || '',
            url_text: p.url_text || '',
            url_link: p.url_link || '',
          })),
        },
      },
    }),
  ]);

  res.redirect('/admin/aboutcompany_vacancies');
};

const remove = async (req, res) => {
  const id = req.params.id;
  await prisma.aboutcompany_vacancy.delete({ where: { id } });
  res.redirect('/admin/aboutcompany_vacancies');
};



module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove
};
