const { prisma } = require('../prisma/prisma-client');

// Create Page
const create_page = async (req, res) => {
  const user = req.session.user;
  const contactHoursId = req.params.contactHoursId;

  // Վերցնում ենք բոլոր Contact Hours
  const contactHoursList = await prisma.contact_hours.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('days/create_days', {
    dayItem: {},
    error: null,
    contactHoursId,
    contactHoursList, // <-- select-ի համար
    user,
    title: 'Create Day',
    layout: 'base',
  });
};

// Add Day
const add = async (req, res) => {
  const user = req.session.user;
  const { day, time, contactHoursId } = req.body; // <-- ստանում ենք body-ից

  if (!day || !time || !contactHoursId) {
    const contactHoursList = await prisma.contact_hours.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return res.render('days/create_days', {
      dayItem: req.body,
      error: 'Please fill in all fields',
      contactHoursId,
      contactHoursList,
      user,
      title: 'Create Day',
      layout: 'base',
    });
  }

  try {
    await prisma.days.create({
      data: { day, time, contactHoursId },
    });
    res.redirect(`/admin/contacts_hours`);
  } catch (err) {
    console.error(err);
    const contactHoursList = await prisma.contact_hours.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.render('days/create_days', {
      dayItem: req.body,
      error: 'Failed to create day',
      contactHoursId,
      contactHoursList,
      user,
      title: 'Create Day',
      layout: 'base',
    });
  }
};

// Edit Page
const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const contactHoursId = req.params.contactHoursId;

  const dayItem = await prisma.days.findUnique({ where: { id } });
  if (!dayItem) return res.redirect(`/admin/contacts_hours`);

  const contactHoursList = await prisma.contact_hours.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('days/update_days', {
    dayItem,
    error: null,
    contactHoursId,
    contactHoursList,
    user,
    title: 'Update Day',
    layout: 'base',
  });
};

// Edit Day
const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const contactHoursId = req.params.contactHoursId;
  const { day, time } = req.body;

  if (!day || !time) {
    const contactHoursList = await prisma.contact_hours.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return res.render('days/update_days', {
      dayItem: { ...req.body, id },
      error: 'Please fill in all fields',
      contactHoursId,
      contactHoursList,
      user,
      title: 'Update Day',
      layout: 'base',
    });
  }

  try {
    await prisma.days.update({
      where: { id },
      data: { day, time },
    });
    res.redirect(`/admin/contacts_hours`);
  } catch (err) {
    console.error(err);
    const contactHoursList = await prisma.contact_hours.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.render('days/update_days', {
      dayItem: { ...req.body, id },
      error: 'Update failed',
      contactHoursId,
      contactHoursList,
      user,
      title: 'Update Day',
      layout: 'base',
    });
  }
};

// Remove Day
const remove = async (req, res) => {
  const id = req.params.id;
  const contactHoursId = req.params.contactHoursId;

  try {
    await prisma.days.delete({ where: { id } });
  } catch (err) {
    console.error('Failed to delete day:', err);
  }

  res.redirect(`/admin/contacts_hours`);
};

module.exports = {
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
