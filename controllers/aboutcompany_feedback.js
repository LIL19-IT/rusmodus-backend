const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const feedbacks = await prisma.aboutcompany_feedback.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('aboutcompany_feedback/aboutcompany_feedback', {
    feedbacks,
    user,
    title: 'About Company Feedback',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('aboutcompany_feedback/create_aboutcompany_feedback', {
    error: null,
    user,
    title: 'Create About Company Feedback',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const {
    title,
    description,
    checkbox_text,
    btn_text,
    placeholder_name,
    placeholder_phone,
    placeholder_email,
    placeholder_question,
    lang
  } = req.body;

  if (
    !title ||
    !description ||
    !checkbox_text ||
    !btn_text ||
    !placeholder_name ||
    !placeholder_phone ||
    !placeholder_email ||
    !placeholder_question ||
    !lang
  ) {
    return res.render('aboutcompany_feedback/create_aboutcompany_feedback', {
      error: 'All fields are required',
      user,
      title: 'Create About Company Feedback',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_feedback.create({
    data: {
      title,
      description,
      checkbox_text,
      btn_text,
      placeholder_name,
      placeholder_phone,
      placeholder_email,
      placeholder_question,
      lang
    },
  });

  res.redirect('/admin/aboutcompany_feedback'); 
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const feedback = await prisma.aboutcompany_feedback.findUnique({ where: { id } });

  if (!feedback) return res.redirect('/admin/aboutcompany_feedback'); 

  res.render('aboutcompany_feedback/update_aboutcompany_feedback', {
    feedback,
    error: null,
    user,
    title: 'Edit About Company Feedback',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const {
    title,
    description,
    checkbox_text,
    btn_text,
    placeholder_name,
    placeholder_phone,
    placeholder_email,
    placeholder_question
  } = req.body;

  const feedback = await prisma.aboutcompany_feedback.findUnique({ where: { id } });

  if (!feedback) return res.redirect('/admin/aboutcompany_feedback'); 

  if (
    !title ||
    !description ||
    !checkbox_text ||
    !btn_text ||
    !placeholder_name ||
    !placeholder_phone ||
    !placeholder_email ||
    !placeholder_question
  ) {
    return res.render('aboutcompany_feedback/update_aboutcompany_feedback', {
      error: 'All fields are required',
      feedback,
      user,
      title: 'Edit About Company Feedback',
      layout: 'base',
    });
  }

  await prisma.aboutcompany_feedback.update({
    where: { id },
    data: {
      title,
      description,
      checkbox_text,
      btn_text,
      placeholder_name,
      placeholder_phone,
      placeholder_email,
      placeholder_question
    },
  });

  res.redirect('/admin/aboutcompany_feedback'); 
};

const remove = async (req, res) => {
  const id = req.params.id;

  await prisma.aboutcompany_feedback.delete({
    where: { id },
  });

  res.redirect('/admin/aboutcompany_feedback');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
