const { prisma } = require('../prisma/prisma-client');


const create_page = async (req, res) => {
  const user = req.session.user;
  const contactLinksId = req.params.contactLinksId;

  const contactLinksList = await prisma.contact_links.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('links/create_links', {
    link: {},
    error: null,
    contactLinksId,
    contactLinksList,
    user,
    title: 'Create Link',
    layout: 'base',
  });
};


const add = async (req, res) => {
  const user = req.session.user;
  const { platform, img_url, url_links, contactLinksId } = req.body;

  if (!platform || !img_url || !url_links || !contactLinksId) {
    const contactLinksList = await prisma.contact_links.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return res.render('links/create_links', {
      link: req.body,
      error: 'Please fill in all fields',
      contactLinksId,
      contactLinksList,
      user,
      title: 'Create Link',
      layout: 'base',
    });
  }

  try {
    await prisma.links.create({
      data: { platform, img_url, url_links, contactLinksId },
    });
    res.redirect(`/admin/contacts_links`);
  } catch (err) {
    console.error(err);
    const contactLinksList = await prisma.contact_links.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.render('links/create_links', {
      link: req.body,
      error: 'Failed to create link',
      contactLinksId,
      contactLinksList,
      user,
      title: 'Create Link',
      layout: 'base',
    });
  }
};

const edit_page = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const contactLinksId = req.params.contactLinksId;

  const link = await prisma.links.findUnique({ where: { id } });
  if (!link) return res.redirect(`/admin/contacts_links`);

  const contactLinksList = await prisma.contact_links.findMany({
    orderBy: { createdAt: 'asc' }
  });

  res.render('links/update_links', {
    link,
    error: null,
    contactLinksId,
    contactLinksList,
    user,
    title: 'Update Link',
    layout: 'base',
  });
};

const edit = async (req, res) => {
  const user = req.session.user;
  const id = req.params.id;
  const { platform, img_url, url_links, contactLinksId } = req.body;

  if (!platform || !img_url || !url_links || !contactLinksId) {
    const contactLinksList = await prisma.contact_links.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return res.render('links/update_links', {
      link: { ...req.body, id },
      error: 'Please fill in all fields',
      contactLinksId,
      contactLinksList,
      user,
      title: 'Update Link',
      layout: 'base',
    });
  }

  try {
    await prisma.links.update({
      where: { id },
      data: { platform, img_url, url_links, contactLinksId },
    });
    res.redirect(`/admin/contacts_links`);
  } catch (err) {
    console.error(err);
    const contactLinksList = await prisma.contact_links.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.render('links/update_links', {
      link: { ...req.body, id },
      error: 'Update failed',
      contactLinksId,
      contactLinksList,
      user,
      title: 'Update Link',
      layout: 'base',
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  const contactLinksId = req.params.contactLinksId;

  try {
    await prisma.links.delete({ where: { id } });
  } catch (err) {
    console.error('Failed to delete link:', err);
  }

  res.redirect(`/admin/contacts_links`);
};

module.exports = {
  create_page,
  add,
  edit_page,
  edit,
  remove,
};
