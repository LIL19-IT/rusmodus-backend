const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const btn_texts = await prisma.farmanimals_show_product_btn_text.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('farmanimals_show_product_btn_text/farmanimals_show_product_btn_text', {
    btn_texts,
    user,
    title: 'Show Product Button Texts',
    layout: 'base',
  });
};

const create_page = async (req, res) => {
  const user = req.session.user;

  res.render('farmanimals_show_product_btn_text/create_farmanimals_show_product_btn_text', {
    error: null,
    btn_text: {},
    user,
    title: 'Create Button Text',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { text, lang } = req.body;

  if (!text || !lang) {
    return res.render('farmanimals_show_product_btn_text/create_farmanimals_show_product_btn_text', {
      error: 'All fields are required.',
      btn_text: req.body,
      user,
      title: 'Create Button Text',
      layout: 'base',
    });
  }

  try {
    await prisma.farmanimals_show_product_btn_text.create({
      data: { text, lang },
    });
    res.redirect('/admin/farmanimals_show_product_btn_text'); 
  } catch (error) {
    res.render('farmanimals_show_product_btn_text/create_farmanimals_show_product_btn_text', {
      error: 'Error creating button text. Possibly already exists.',
      btn_text: req.body,
      user,
      title: 'Create Button Text',
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const btn_text = await prisma.farmanimals_show_product_btn_text.findUnique({ where: { id } });
  if (!btn_text) return res.redirect('/admin/farmanimals_show_product_btn_text'); 

  res.render('farmanimals_show_product_btn_text/update_farmanimals_show_product_btn_text', {
    btn_text,
    error: null,
    user,
    title: 'Edit Button Text',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { text } = req.body;

  const btn_text = await prisma.farmanimals_show_product_btn_text.findUnique({ where: { id } });
  if (!btn_text) return res.redirect('/admin/farmanimals_show_product_btn_text'); 

  if (!text) {
    return res.render('farmanimals_show_product_btn_text/update_farmanimals_show_product_btn_text', {
      error: 'All fields are required.',
      btn_text: { ...req.body, id },
      user,
      title: 'Edit Button Text',
      layout: 'base',
    });
  }

  try {
    await prisma.farmanimals_show_product_btn_text.update({
      where: { id },
      data: { text },
    });
    res.redirect('/admin/farmanimals_show_product_btn_text'); 
  } catch (error) {
    res.render('farmanimals_show_product_btn_text/update_farmanimals_show_product_btn_text', {
      error: 'Error updating button text. Possibly already exists.',
      btn_text: { ...req.body, id },
      user,
      title: 'Edit Button Text',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.farmanimals_show_product_btn_text.delete({
    where: { id },
  });

  res.redirect('/admin/farmanimals_show_product_btn_text'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
