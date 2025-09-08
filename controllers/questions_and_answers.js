const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
  const user = req.session.user;
  const questions = await prisma.questions_and_answers.findMany({
    orderBy: { createdAt: 'asc'}
  });

  res.render('questions_and_answers/questions_and_answers', {
    questions,
    user,
    title: 'Questions and Answers',
    layout: 'base',
  });
};

const create_page = (req, res) => {
  const user = req.session.user;

  res.render('questions_and_answers/create_questions_and_answers', {
    error: null,
    question: {},
    user,
    title: 'Create Question & Answer',
    layout: 'base',
  });
};

const add = async (req, res) => {
  const user = req.session.user;
  const { sub_title, route, sub_title1, title, description, lang } = req.body;

  const requiredFields = ['sub_title', 'route', 'sub_title1', 'title', 'description', 'lang'];
  const missingField = requiredFields.find(f => !req.body[f]);

  if (missingField) {
    return res.render('questions_and_answers/create_questions_and_answers', {
      error: `Field "${missingField}" is required`,
      question: req.body,
      user,
      title: 'Create Question & Answer',
      layout: 'base',
    });
  }

  try {
    await prisma.questions_and_answers.create({
      data: { sub_title, route, sub_title1, title, description, lang },
    });
    res.redirect('/admin/questions_and_answers');
  } catch (err) {
    res.render('questions_and_answers/create_questions_and_answers', {
      error: 'Failed to create entry',
      question: req.body,
      user,
      title: 'Create Question & Answer',
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const question = await prisma.questions_and_answers.findUnique({ where: { id } });
  if (!question) return res.redirect('/admin/questions_and_answers');

  res.render('questions_and_answers/update_questions_and_answers', {
    question,
    error: null,
    user,
    title: 'Edit Question & Answer',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { sub_title, route, sub_title1, title, description } = req.body;

  const question = await prisma.questions_and_answers.findUnique({ where: { id } });
  if (!question) return res.redirect('/admin/questions_and_answers');

  const requiredFields = ['sub_title', 'route', 'sub_title1', 'title', 'description'];
  const missingField = requiredFields.find(f => !req.body[f]);

  if (missingField) {
    return res.render('questions_and_answers/update_questions_and_answers', {
      error: `Field "${missingField}" is required`,
      question,
      user,
      title: 'Edit Question & Answer',
      layout: 'base',
    });
  }

  try {
    await prisma.questions_and_answers.update({
      where: { id },
      data: { sub_title, route, sub_title1, title, description },
    });
    res.redirect('/admin/questions_and_answers');
  } catch (err) {
    res.render('questions_and_answers/update_questions_and_answers', {
      error: 'Update failed',
      question: { ...req.body, id },
      user,
      title: 'Edit Question & Answer',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.questions_and_answers.delete({ where: { id } });
  } catch (err) {
    console.error('Failed to delete:', err);
  }
  res.redirect('/admin/questions_and_answers');
};

module.exports = {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
