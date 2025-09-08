const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const headings = await prisma.news_heading.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('news_heading/news_heading', {
    headings,
    user,
    title: 'News Headings',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('news_heading/create_news_heading', {
    error: null,
    user,
    title: 'Create News Heading',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { sub_title, sub_title1, route, lang } = req.body;

  if (!sub_title || !sub_title1 || !route || !lang) {
    return res.render('news_heading/create_news_heading', {
      error: 'All fields are required',
      user,
      title: 'Create News Heading',
      layout: 'base',
    });
  }

  await prisma.news_heading.create({
    data: { sub_title, sub_title1, route, lang },
  });

  res.redirect('/admin/news_heading');
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const heading = await prisma.news_heading.findUnique({ where: { id } });

  if (!heading) return res.redirect('/admin/news_heading');

  res.render('news_heading/update_news_heading', {
    heading,
    error: null,
    user,
    title: 'Edit News Heading',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { sub_title, sub_title1, route} = req.body;

  const heading = await prisma.news_heading.findUnique({ where: { id } });

  if (!heading) return res.redirect('/admin/news_heading');

  if (!sub_title || !sub_title1 || !route ) {
    return res.render('news_heading/update_news_heading', {
      error: 'All fields are required',
      heading,
      user,
      title: 'Edit News Heading',
      layout: 'base',
    });
  }

  await prisma.news_heading.update({
    where: { id },
    data: { sub_title, sub_title1, route },
  });

  res.redirect('/admin/news_heading');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.news_heading.delete({
    where: { id },
  });

  res.redirect('/admin/news_heading');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
