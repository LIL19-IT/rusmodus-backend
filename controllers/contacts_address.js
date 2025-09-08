const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const addresses = await prisma.contact_address.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('contacts_address/contacts_address', {
    addresses,
    user,
    title: 'Contacts Address',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('contacts_address/create_contacts_address', {
    error: null,
    user,
    title: 'Create Contacts Address',
    item: null,
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { lang, title, address, phone_title, phone_number, email_title, email_address } = req.body;

  // Validate required fields
  const requiredFields = ['lang', 'title', 'address', 'phone_title', 'phone_number', 'email_title', 'email_address'];
  const missingField = requiredFields.find(f => !req.body[f]);
  if (missingField) {
    return res.render('contacts_address/create_contacts_address', {
      error: `Field "${missingField}" is required`,
      user,
      title: 'Create Contacts Address',
      item: req.body,
      layout: 'base',
    });
  }

  try {
    await prisma.contact_address.create({
      data: { lang, title, address, phone_title, phone_number, email_title, email_address },
    });
    res.redirect('/admin/contacts_address');
  } catch (err) {
    res.render('contacts_address/create_contacts_address', {
      error: 'Failed to create entry',
      user,
      title: 'Create Contacts Address',
      item: req.body,
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const item = await prisma.contact_address.findUnique({ where: { id } });
  if (!item) return res.redirect('/admin/contacts_address');

  res.render('contacts_address/update_contacts_address', {
    item,
    error: null,
    user,
    title: 'Update Contacts Address',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const item = await prisma.contact_address.findUnique({ where: { id } });
  if (!item) return res.redirect('/admin/contacts_address');

  const { title, address, phone_title, phone_number, email_title, email_address } = req.body;

  const requiredFields = ['title', 'address', 'phone_title', 'phone_number', 'email_title', 'email_address'];
  const missingField = requiredFields.find(f => !req.body[f]);
  if (missingField) {
    return res.render('contacts_address/update_contacts_address', {
      error: `Field "${missingField}" is required`,
      item,
      user,
      title: 'Update Contacts Address',
      layout: 'base',
    });
  }

  try {
    await prisma.contact_address.update({
      where: { id },
      data: { title, address, phone_title, phone_number, email_title, email_address },
    });
    res.redirect('/admin/contacts_address');
  } catch (err) {
    res.render('contacts_address/update_contacts_address', {
      error: 'Update failed',
      item,
      user,
      title: 'Update Contacts Address',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.contact_address.delete({ where: { id } });
  } catch (err) {
    console.error('Failed to delete:', err);
  }

  res.redirect('/admin/contacts_address');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
