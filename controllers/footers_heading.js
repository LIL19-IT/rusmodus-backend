const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const headings = await prisma.footer_heading.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('footers_heading/footers_heading', {
    headings,
    user,
    title: 'Footer Headings',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('footers_heading/create_footers_heading', {
    error: null,
    heading: {},
    user,
    title: 'Create Footer Heading',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { title, lang } = req.body;

  const requiredFields = ['title', 'lang'];
  const missingField = requiredFields.find(f => !req.body[f]);

  if (missingField) {
    return res.render('footers_heading/create_footers_heading', {
      error: `Field "${missingField}" is required`,
      heading: req.body,
      user,
      title: 'Create Footer Heading',
      layout: 'base',
    });
  }

  try {
    await prisma.footer_heading.create({
      data: { title, lang },
    });
    res.redirect('/admin/footers_heading');
  } catch (err) {
    res.render('footers_heading/create_footers_heading', {
      error: 'Failed to create entry',
      heading: req.body,
      user,
      title: 'Create Footer Heading',
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const heading = await prisma.footer_heading.findUnique({ where: { id } });
  if (!heading) return res.redirect('/admin/footers_heading');

  res.render('footers_heading/update_footers_heading', {
    heading,
    error: null,
    user,
    title: 'Edit Footer Heading',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { title } = req.body;

  const heading = await prisma.footer_heading.findUnique({ where: { id } });
  if (!heading) return res.redirect('/admin/footers_heading');

  if (!title) {
    return res.render('footers_heading/update_footers_heading', {
      error: 'Field "title" is required',
      heading: { ...heading, ...req.body },
      user,
      title: 'Edit Footer Heading',
      layout: 'base',
    });
  }

  try {
    await prisma.footer_heading.update({
      where: { id },
      data: { title },
    });
    res.redirect('/admin/footers_heading');
  } catch (err) {
    res.render('footers_heading/update_footers_heading', {
      error: 'Update failed',
      heading: { ...heading, ...req.body },
      user,
      title: 'Edit Footer Heading',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.footer_heading.delete({ where: { id } });
  } catch (err) {
    console.error('Failed to delete footer heading:', err);
  }
  res.redirect('/admin/footers_heading');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
