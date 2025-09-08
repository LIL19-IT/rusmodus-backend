const { prisma } = require('../prisma/prisma-client');

const create_page = async (req, res) => {
  const user = req.session.user;

  const procurementAdvantages = await prisma.procurement_advantage.findMany({
    orderBy: { createdAt: 'asc' },
  });

  res.render('advantages/create_advantages', {
    error: null,
    advantage: {},
    procurementAdvantages,
    user,
    title: 'Add Advantage',
    layout: 'base',
  });
};

const create = async (req, res) => {
  const user = req.session.user;
  const { number, description, procurementAdvantageId } = req.body;

  if (!number || !description || !procurementAdvantageId) {
    const procurementAdvantages = await prisma.procurement_advantage.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return res.render('advantages/create_advantages', {
      error: 'Please fill all fields.',
      advantage: req.body,
      procurementAdvantages,
      user,
      title: 'Add Advantage',
      layout: 'base',
    });
  }

  await prisma.advantage.create({
    data: {
      number,
      description,
      procurementAdvantageId,
    },
  });

  res.redirect('/admin/procurement_advantages'); // list page
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;

  const advantage = await prisma.advantage.findUnique({ where: { id } });
  if (!advantage) return res.redirect('/admin/procurement_advantages');

  const procurementAdvantages = await prisma.procurement_advantage.findMany({
    orderBy: { createdAt: 'asc' },
  });

  res.render('advantages/update_advantages', {
    advantage,
    error: null,
    procurementAdvantages,
    user,
    title: 'Edit Advantage',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { number, description, procurementAdvantageId } = req.body;

  if (!number || !description || !procurementAdvantageId) {
    const advantage = await prisma.advantage.findUnique({ where: { id } });
    const procurementAdvantages = await prisma.procurement_advantage.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return res.render('advantages/update_advantages', {
      error: 'Please fill all fields.',
      advantage: { ...advantage, ...req.body },
      procurementAdvantages,
      user,
      title: 'Edit Advantage',
      layout: 'base',
    });
  }

  await prisma.advantage.update({
    where: { id },
    data: {
      number,
      description,
      procurementAdvantageId,
    },
  });

  res.redirect('/admin/procurement_advantages');
};

const remove = async (req, res) => {
  const id = req.params.id;

  const advantage = await prisma.advantage.findUnique({ where: { id } });
  if (!advantage) return res.redirect('/admin/procurement_advantages');

  await prisma.advantage.delete({ where: { id } });
  res.redirect('/admin/procurement_advantages');
};

module.exports = {
  create_page,
  create,
  edit_page,
  edit,
  remove,
};
