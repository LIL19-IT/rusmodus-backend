const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const newsInfos = await prisma.news_info.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('news_info/news_info', {
    newsInfos,
    user,
    title: 'News Info List',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('news_info/create_news_info', {
    error: null,
    user,
    title: 'Create News Info',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { img_url, data, title, link_about, categories, lang } = req.body;

  if (!img_url || !data || !title || !link_about || !categories || !lang) {
    return res.render('news_info/create_news_info', {
      error: 'All fields are required',
      user,
      title: 'Create News Info',
      layout: 'base',
    });
  }

  await prisma.news_info.create({
    data: { img_url, data, title, link_about, categories, lang },
  });

  res.redirect('/admin/news_info');
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const newsInfo = await prisma.news_info.findUnique({ where: { id } });

  if (!newsInfo) return res.redirect('/admin/news_info');

  res.render('news_info/update_news_info', {
    newsInfo,
    error: null,
    user,
    title: 'Edit News Info',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { img_url, data, title, link_about, categories} = req.body;

  const newsInfo = await prisma.news_info.findUnique({ where: { id } });

  if (!newsInfo) return res.redirect('/admin/news_info');

  if (!img_url || !data || !title || !link_about || !categories ) {
    return res.render('news_info/update_news_info', {
      error: 'All fields are required',
      newsInfo,
      user,
      title: 'Edit News Info',
      layout: 'base',
    });
  }

  await prisma.news_info.update({
    where: { id },
    data: { img_url, data, title, link_about, categories },
  });

  res.redirect('/admin/news_info');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.news_info.delete({
    where: { id },
  });

  res.redirect('/admin/news_info');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
