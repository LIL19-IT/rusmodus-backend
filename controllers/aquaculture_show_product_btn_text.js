const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const btnTexts = await prisma.aquaculture_show_product_btn_text.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aquaculture_show_product_btn_text/aquaculture_show_product_btn_text', {
    btnTexts,
    user,
    title: 'Aquaculture Show Product Button Text',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aquaculture_show_product_btn_text/create_aquaculture_show_product_btn_text', {
    error: null,
    user,
    title: 'Create Button Text',
    layout: 'base',
    formAction: '/admin/aquaculture_show_product_btn_text/create',
    buttonText: 'Create',
    btnText: { text: '', lang: '' },
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { text, lang } = req.body;

  if (!text || !lang) {
    return res.render('aquaculture_show_product_btn_text/create_aquaculture_show_product_btn_text', {
      error: 'All fields are required',
      user,
      title: 'Create Button Text',
      layout: 'base',
      formAction: '/admin/aquaculture_show_product_btn_text/create',
      buttonText: 'Create',
      btnText: { text: text || '', lang: lang || '' },
    });
  }

  await prisma.aquaculture_show_product_btn_text.create({ data: { text, lang } });

  res.redirect('/admin/aquaculture_show_product_btn_text'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const btnText = await prisma.aquaculture_show_product_btn_text.findUnique({ where: { id } });

  if (!btnText) return res.redirect('/admin/aquaculture_show_product_btn_text');

  res.render('aquaculture_show_product_btn_text/update_aquaculture_show_product_btn_text', {
    btnText,
    error: null,
    user,
    title: 'Edit Button Text',
    layout: 'base',
    formAction: `/admin/aquaculture_show_product_btn_text/edit/${id}`,
    buttonText: 'Update',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { text } = req.body;

  const btnText = await prisma.aquaculture_show_product_btn_text.findUnique({ where: { id } });
  if (!btnText) return res.redirect('/admin/aquaculture_show_product_btn_text');

  if (!text) {
    return res.render('aquaculture_show_product_btn_text/update_aquaculture_show_product_btn_text', {
      error: 'All fields are required',
      btnText: { id, text: text || '' },
      user,
      title: 'Edit Button Text',
      layout: 'base',
      formAction: `/admin/aquaculture_show_product_btn_text/edit/${id}`,
      buttonText: 'Update',
    });
  }

  await prisma.aquaculture_show_product_btn_text.update({ where: { id }, data: { text } });

  res.redirect('/admin/aquaculture_show_product_btn_text'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aquaculture_show_product_btn_text.delete({ where: { id } });

  res.redirect('/admin/aquaculture_show_product_btn_text'); 
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
