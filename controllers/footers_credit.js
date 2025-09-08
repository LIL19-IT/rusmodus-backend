const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const credits = await prisma.footer_credit.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('footers_credit/footers_credit', {
    credits,
    user,
    title: 'Footer Credits',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('footers_credit/create_footers_credit', {
    error: null,
    user,
    title: 'Create Footer Credit',
    layout: 'base',
    credit: {}, 
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { lang, privacy_policy, legal_info, info } = req.body;

  const requiredFields = ['lang', 'privacy_policy', 'legal_info', 'info'];
  const missingField = requiredFields.find(f => !req.body[f]);

  if (missingField) {
    return res.render('footers_credit/create_footers_credit', {
      error: `Field "${missingField}" is required`,
      credit: req.body,
      user,
      title: 'Create Footer Credit',
      layout: 'base',
    });
  }

  try {
    await prisma.footer_credit.create({
      data: { lang, privacy_policy, legal_info, info },
    });
    res.redirect('/admin/footers_credit');
  } catch (err) {
    res.render('footers_credit/create_footers_credit', {
      error: 'Failed to create entry',
      credit: req.body,
      user,
      title: 'Create Footer Credit',
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const credit = await prisma.footer_credit.findUnique({ where: { id } });
  if (!credit) return res.redirect('/admin/footers_credit');

  res.render('footers_credit/update_footers_credit', {
    credit,
    error: null,
    user,
    title: 'Edit Footer Credit',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { privacy_policy, legal_info, info } = req.body;

  const credit = await prisma.footer_credit.findUnique({ where: { id } });
  if (!credit) return res.redirect('/admin/footers_credit');

  const requiredFields = ['privacy_policy', 'legal_info', 'info'];
  const missingField = requiredFields.find(f => !req.body[f]);

  if (missingField) {
    return res.render('footers_credit/update_footers_credit', {
      error: `Field "${missingField}" is required`,
      credit: { ...credit, ...req.body },
      user,
      title: 'Edit Footer Credit',
      layout: 'base',
    });
  }

  try {
    await prisma.footer_credit.update({
      where: { id },
      data: { privacy_policy, legal_info, info },
    });
    res.redirect('/admin/footers_credit');
  } catch (err) {
    res.render('footers_credit/update_footers_credit', {
      error: 'Update failed',
      credit: { ...credit, ...req.body },
      user,
      title: 'Edit Footer Credit',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.footer_credit.delete({ where: { id } });
  } catch (err) {
    console.error('Failed to delete footer credit:', err);
  }
  res.redirect('/admin/footers_credit');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
