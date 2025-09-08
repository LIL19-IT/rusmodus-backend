const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const newsList = await prisma.news_content.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('news_content/news_content', {
    newsList,
    user,
    title: 'News Content',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('news_content/create_news_content', {
    error: null,
    user,
    title: 'Create News Content',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const {
    sub_title,
    sub_title1,
    sub_title2,
    title,
    data,
    name,
    name1,
    name2,
    name3,
    img_url,
    img1_url,
    img2_url,
    img3_url,
    img4_url,
    img5_url,
    img6_url,
    img7_url,
    img8_url,
    img11_url,
    video_src,
    description,
    description1,
    description2,
    description3,
    url_text,
    url_link,
    url_text1,
    url_link1,
    url_text2,
    url_link2,
    info_title,
    news_title,
    lang,
  } = req.body;

  if (
    !sub_title ||
    !title ||
    !data ||
    !name ||
    !img_url ||
    !info_title ||
    !lang
  ) {
    return res.render('news_content/create_news_content', {
      error: 'Please fill all required fields (sub_title, title, data, name, img_url, info_title, lang)',
      user,
      title: 'Create News Content',
      layout: 'base',
    });
  }

  await prisma.news_content.create({
    data: {
      sub_title,
      sub_title1,
      sub_title2,
      title,
      data,
      name,
      name1,
      name2,
      name3,
      img_url,
      img1_url,
      img2_url,
      img3_url,
      img4_url,
      img5_url,
      img6_url,
      img7_url,
      img8_url,
      img11_url,
      video_src,
      description,
      description1,
      description2,
      description3,
      url_text,
      url_link,
      url_text1,
      url_link1,
      url_text2,
      url_link2,
      info_title,
      news_title,
      lang,
    },
  });

  res.redirect('/admin/news_content');
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const newsItem = await prisma.news_content.findUnique({ where: { id } });

  if (!newsItem) return res.redirect('/admin/news_content');

  res.render('news_content/update_news_content', {
    newsItem,
    error: null,
    user,
    title: 'Edit News Content',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const {
    sub_title,
    sub_title1,
    sub_title2,
    title,
    data,
    name,
    name1,
    name2,
    name3,
    img_url,
    img1_url,
    img2_url,
    img3_url,
    img4_url,
    img5_url,
    img6_url,
    img7_url,
    img8_url,
    img11_url,
    video_src,
    description,
    description1,
    description2,
    description3,
    url_text,
    url_link,
    url_text1,
    url_link1,
    url_text2,
    url_link2,
    info_title,
    news_title
  } = req.body;

  const newsItem = await prisma.news_content.findUnique({ where: { id } });
  if (!newsItem) return res.redirect('/admin/news_content');

  if (
    !sub_title ||
    !title ||
    !data ||
    !name ||
    !img_url ||
    !info_title 
  ) {
    return res.render('news_content/update_news_content', {
      error: 'Please fill all required fields (sub_title, title, data, name, img_url, info_title, lang)',
      newsItem,
      user,
      title: 'Edit News Content',
      layout: 'base',
    });
  }

  await prisma.news_content.update({
    where: { id },
    data: {
      sub_title,
      sub_title1,
      sub_title2,
      title,
      data,
      name,
      name1,
      name2,
      name3,
      img_url,
      img1_url,
      img2_url,
      img3_url,
      img4_url,
      img5_url,
      img6_url,
      img7_url,
      img8_url,
      img11_url,
      video_src,
      description,
      description1,
      description2,
      description3,
      url_text,
      url_link,
      url_text1,
      url_link1,
      url_text2,
      url_link2,
      info_title,
      news_title
    },
  });

  res.redirect('/admin/news_content');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.news_content.delete({ where: { id } });

  res.redirect('/admin/news_content');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
