const { prisma } = require("../prisma/prisma-client");

// GET all
const getAllContactLinks = async (req, res) => {
  try {
    const contactLinks = await prisma.contact_links.findMany({
      include: { links: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    res.render("contacts_links/index", {
      title: "Contact Links",
      contactLinks,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contact links");
  }
};

// GET by id
const getContactLinksById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactLink = await prisma.contact_links.findUnique({
      where: { id },
      include: { links: { orderBy: { createdAt: "asc" } } },
    });
    if (!contactLink) return res.status(404).send("Contact Links not found");

    res.render("contacts_links/update", {
      contactLink,
      id,
      title: contactLink.title,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contact links");
  }
};

// CREATE
const createContactLinks = async (req, res) => {
  try {
    const body = req.body;
    const links = [];

    Object.keys(body).forEach((key) => {
      const match = key.match(/links\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!links[idx]) links[idx] = {};
        links[idx][field] = body[key];
      }
    });

    await prisma.contact_links.create({
      data: {
        title: body.title || "",
        lang: body.lang || "en",
        links: {
          create: links.map((l) => ({
            platform: l.platform || "",
            img_url: l.img_url || "",
            url_links: l.url_links || "",
          })),
        },
      },
    });

    res.redirect("/admin/contacts_links");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating contact links");
  }
};

// UPDATE parent
const updateContactLinks = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await prisma.contact_links.update({
      where: { id },
      data: {
        title: body.title,
        lang: body.lang,
      },
    });

    res.redirect("/admin/contacts_links");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

// DELETE
const deleteContactLinks = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.links.deleteMany({ where: { contactLinksId: id } });
    await prisma.contact_links.delete({ where: { id } });

    res.redirect("/admin/contacts_links");
  } catch (err) {
    console.error("Error deleting contact links:", err);
    res.status(500).send("Error deleting contact links");
  }
};

// UPDATE links (childs)
const updateLinks = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const links = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/links\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!links[idx]) links[idx] = {};
        links[idx][field] = body[key];
      }
    });

    const existingLinks = await prisma.links.findMany({
      where: { contactLinksId: id },
    });
    const existingIds = existingLinks.map((l) => l.id);

    const submittedIds = links
      .filter((l) => l.id && l.id.trim() !== "")
      .map((l) => l.id);

    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));
    if (idsToDelete.length > 0) {
      await prisma.links.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const l of links) {
      if (l.id && l.id.trim() !== "") {
        await prisma.links.update({
          where: { id: l.id },
          data: {
            platform: l.platform,
            img_url: l.img_url,
            url_links: l.url_links,
          },
        });
      } else if (
        (l.platform && l.platform.trim() !== "") ||
        (l.url_links && l.url_links.trim() !== "")
      ) {
        await prisma.links.create({
          data: {
            platform: l.platform,
            img_url: l.img_url,
            url_links: l.url_links,
            contactLinksId: id,
          },
        });
      }
    }

    res.redirect(`/admin/contacts_links/edit/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating/creating links");
  }
};

module.exports = {
  getAllContactLinks,
  getContactLinksById,
  createContactLinks,
  updateContactLinks,
  deleteContactLinks,
  updateLinks,
};
