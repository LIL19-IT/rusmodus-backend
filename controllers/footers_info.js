const { prisma } = require("../prisma/prisma-client");

const getAllFootersInfo = async (req, res) => {
  try {
    const footersInfo = await prisma.footers_info.findMany({
      include: { social_links: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    res.render("footers_info/index", {
      title: "Footers Info",
      footersInfo,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching footers info");
  }
};

const getFooterInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const footer = await prisma.footers_info.findUnique({
      where: { id },
      include: { social_links: { orderBy: { createdAt: "asc" } } },
    });

    if (!footer) return res.status(404).send("Footer info not found");

    res.render("footers_info/update", {
      footer,
      id,
      title: footer.title,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching footer info");
  }
};

const createFooterInfo = async (req, res) => {
  try {
    const body = req.body;

    const socialLinks = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/social_links\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!socialLinks[idx]) socialLinks[idx] = {};
        socialLinks[idx][field] = body[key];
      }
    });

    await prisma.footers_info.create({
      data: {
        title: body.title || "",
        lang: body.lang || "en",
        tel: body.tel || "",
        email: body.email || "",
        social_links: {
          create: socialLinks.map((l) => ({
            img_url: l.img_url || "",
            url_links: l.url_links || "",
          })),
        },
      },
    });

    res.redirect("/admin/footers_info");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating footer info");
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await prisma.footers_info.update({
      where: { id },
      data: { title: body.title, lang: body.lang, tel: body.tel, email: body.email },
    });

    res.redirect("/admin/footers_info");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

const deleteFooterInfo = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.social_links.deleteMany({ where: { footerId: id } });
    await prisma.footers_info.delete({ where: { id } });

    res.redirect("/admin/footers_info");
  } catch (err) {
    console.error("Error deleting footer info:", err);
    res.status(500).send("Error deleting footer info");
  }
};

const updateSocialLinks = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const socialLinks = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/social_links\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!socialLinks[idx]) socialLinks[idx] = {};
        socialLinks[idx][field] = body[key];
      }
    });

    const existingLinks = await prisma.social_links.findMany({ where: { footerId: id } });
    const existingIds = existingLinks.map((l) => l.id);
    const submittedIds = socialLinks.filter((l) => l.id && l.id.trim() !== "").map((l) => l.id);

    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));
    if (idsToDelete.length > 0) {
      await prisma.social_links.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const l of socialLinks) {
      if (l.id && l.id.trim() !== "") {
        await prisma.social_links.update({ where: { id: l.id }, data: { img_url: l.img_url, url_links: l.url_links } });
      } else {
        await prisma.social_links.create({ data: { img_url: l.img_url, url_links: l.url_links, footerId: id } });
      }
    }

    res.redirect(`/admin/footers_info/edit/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating/creating social links");
  }
};

module.exports = {
  getAllFootersInfo,
  getFooterInfoById,
  createFooterInfo,
  updateData,
  deleteFooterInfo,
  updateSocialLinks,
};
