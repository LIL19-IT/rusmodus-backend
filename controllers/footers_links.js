const { prisma } = require("../prisma/prisma-client");

const getAllFooterLinks = async (req, res) => {
  try {
    const footersLinks = await prisma.footer_link.findMany({
      include: { links: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    res.render("footers_links/index", {
      title: "Footer Links",
      footersLinks,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching footer links");
  }
};

const getFooterLinkById = async (req, res) => {
  try {
    const { id } = req.params;
    const footer = await prisma.footer_link.findUnique({
      where: { id },
      include: { links: { orderBy: { createdAt: "asc" } } },
    });
    if (!footer) return res.status(404).send("Footer not found");

    res.render("footers_links/update", {
      footer,
      id,
      title: footer.title,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching footer");
  }
};

const createFooterLink = async (req, res) => {
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

    await prisma.footer_link.create({
      data: {
        title: body.title || "",
        lang: body.lang || "en",
        links: {
          create: links.map((l) => ({
            title: l.title || "",
            route: l.route || "",
            lang: l.lang || body.lang || "en",
          })),
        },
      },
    });

    res.redirect("/admin/footers_links");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating footer link");
  }
};


const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await prisma.footer_link.update({
      where: { id },
      data: { title: body.title, lang: body.lang },
    });

    res.redirect("/admin/footers_links");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

const deleteFooter = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.link.deleteMany({ where: { footerId: id } });
    await prisma.footer_link.delete({ where: { id } });

    res.redirect("/admin/footers_links");
  } catch (err) {
    console.error("Error deleting footer:", err);
    res.status(500).send("Error deleting footer");
  }
};

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

    const existingLinks = await prisma.link.findMany({ where: { footerId: id } });
    const existingIds = existingLinks.map((l) => l.id);

    const submittedIds = links.filter((l) => l.id && l.id.trim() !== "").map((l) => l.id);

    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));
    if (idsToDelete.length > 0) {
      await prisma.link.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const l of links) {
      if (l.id && l.id.trim() !== "") {
        await prisma.link.update({ where: { id: l.id }, data: { title: l.title, route: l.route, lang: l.lang } });
      } else {
        await prisma.link.create({ data: { title: l.title, route: l.route, lang: l.lang, footerId: id } });
      }
    }

    res.redirect(`/admin/footers_links/edit/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating/creating links");
  }
};

module.exports = {
  getAllFooterLinks,
  getFooterLinkById,
  createFooterLink,
  updateData,
  deleteFooter,
  updateLinks,
};
