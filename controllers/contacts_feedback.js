const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const feedbacks = await prisma.contacts_feedback.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('contacts_feedback/contacts_feedback', {
    feedbacks,
    user,
    title: 'Contacts Feedback',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;
  res.render('contacts_feedback/create_contacts_feedback', {
    error: null,
    user,
    title: 'Create Contacts Feedback',
    item: null,
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const {
    sub_title,
    sub_title1,
    route,
    title,
    description,
    checkbox_text,
    btn_text,
    placeholder_name,
    placeholder_phone,
    placeholder_email,
    placeholder_question,
    lang,
  } = req.body;

  const requiredFields = [
    'sub_title', 'sub_title1', 'route', 'title', 'description',
    'checkbox_text', 'btn_text', 'placeholder_name', 'placeholder_phone',
    'placeholder_email', 'placeholder_question', 'lang'
  ];

  const missingField = requiredFields.find(f => !req.body[f]);
  if (missingField) {
    return res.render('contacts_feedback/create_contacts_feedback', {
      error: `Field "${missingField}" is required`,
      user,
      title: 'Create Contacts Feedback',
      item: req.body,
      layout: 'base',
    });
  }

  try {
    await prisma.contacts_feedback.create({
      data: {
        sub_title,
        sub_title1,
        route,
        title,
        description,
        checkbox_text,
        btn_text,
        placeholder_name,
        placeholder_phone,
        placeholder_email,
        placeholder_question,
        lang,
      },
    });
    res.redirect('/admin/contacts_feedback');
  } catch (err) {
    res.render('contacts_feedback/create_contacts_feedback', {
      error: 'Failed to create entry',
      user,
      title: 'Create Contacts Feedback',
      item: req.body,
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const item = await prisma.contacts_feedback.findUnique({ where: { id } });
  if (!item) return res.redirect('/admin/contacts_feedback');

  res.render('contacts_feedback/update_contacts_feedback', {
    item,
    error: null,
    user,
    title: 'Update Contacts Feedback',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const item = await prisma.contacts_feedback.findUnique({ where: { id } });
  if (!item) return res.redirect('/admin/contacts_feedback');

  const {
    sub_title,
    sub_title1,
    route,
    title,
    description,
    checkbox_text,
    btn_text,
    placeholder_name,
    placeholder_phone,
    placeholder_email,
    placeholder_question
  } = req.body;

  const requiredFields = [
    'sub_title', 'sub_title1', 'route', 'title', 'description',
    'checkbox_text', 'btn_text', 'placeholder_name', 'placeholder_phone',
    'placeholder_email', 'placeholder_question'
  ];

  const missingField = requiredFields.find(f => !req.body[f]);
  if (missingField) {
    return res.render('contacts_feedback/update_contacts_feedback', {
      error: `Field "${missingField}" is required`,
      item,
      user,
      title: 'Update Contacts Feedback',
      layout: 'base',
    });
  }

  try {
    await prisma.contacts_feedback.update({
      where: { id },
      data: {
        sub_title,
        sub_title1,
        route,
        title,
        description,
        checkbox_text,
        btn_text,
        placeholder_name,
        placeholder_phone,
        placeholder_email,
        placeholder_question,
      },
    });
    res.redirect('/admin/contacts_feedback');
  } catch (err) {
    res.render('contacts_feedback/update_contacts_feedback', {
      error: 'Update failed',
      item,
      user,
      title: 'Update Contacts Feedback',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.contacts_feedback.delete({ where: { id } });
  } catch (err) {
    console.error('Failed to delete:', err);
  }
  res.redirect('/admin/contacts_feedback');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
