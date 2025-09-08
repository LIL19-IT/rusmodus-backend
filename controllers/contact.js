const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('contact/contact', {
    contacts,
    user,
    title: 'Contacts',
    layout: 'base'
  });
};

const create_page = async (req, res) => {
  const user = req.session.user;
  res.render('contact/create_contact', {
    error: null,
    user,
    title: 'Create Contact',
    layout: 'base'
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { lang, phone, callRequestLabel } = req.body;

  if (!lang || !phone || !callRequestLabel) {
    return res.render('contact/create_contact', {
      error: 'Please fill in all fields',
      user,
      title: 'Create Contact',
      layout: 'base'
    });
  }

  await prisma.contact.create({
    data: { lang, phone, callRequestLabel }
  });

  res.redirect('/admin/contact');
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) return res.redirect('/admin/contact');

  res.render('contact/update_contact', {
    contact,
    error: null,
    user,
    title: 'Update Contact',
    layout: 'base'
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { phone, callRequestLabel } = req.body;

  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) return res.redirect('/admin/contact');

  if (!phone || !callRequestLabel) {
    return res.render('contact/update_contact', {
      error: 'Please fill in all fields',
      contact,
      user,
      title: 'Update Contact',
      layout: 'base'
    });
  }

  await prisma.contact.update({
    where: { id },
    data: { phone, callRequestLabel }
  });

  res.redirect('/admin/contact');
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.contact.delete({ where: { id } });
  res.redirect('/admin/contact');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove
};
