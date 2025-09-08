const { prisma } = require("../prisma/prisma-client");

// 📌 Բոլոր procurement advantages
const getAllAdvantages = async (req, res) => {
  try {
    const advantages = await prisma.procurement_advantage.findMany({
      include: { advantages: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    res.render("procurement_advantages/index", {
      title: "Procurement Advantages",
      advantages,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching procurement advantages");
  }
};

// 📌 Մեկ procurement advantage ըստ ID
const getAdvantageById = async (req, res) => {
  try {
    const { id } = req.params;
    const advantage = await prisma.procurement_advantage.findUnique({
      where: { id },
      include: { advantages: { orderBy: { createdAt: "asc" } } },
    });
    if (!advantage) return res.status(404).send("Procurement advantage not found");

    res.render("procurement_advantages/update", {
      advantage,  // կարևոր է ճիշտ փոփոխական անունը
      id,
      title: advantage.title,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching procurement advantage");
  }
};

// 📌 Ստեղծել procurement advantage + advantages
const createAdvantage = async (req, res) => {
  try {
    const body = req.body;
    const advantages = [];

    Object.keys(body).forEach((key) => {
      const match = key.match(/advantages\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!advantages[idx]) advantages[idx] = {};
        advantages[idx][field] = body[key];
      }
    });

    await prisma.procurement_advantage.create({
      data: {
        title: body.title || "",
        lang: body.lang || "en",
        advantages: {
          create: advantages.map((a) => ({
            number: a.number || "",
            description: a.description || "",
          })),
        },
      },
    });

    res.redirect("/admin/procurement_advantages");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating procurement advantage");
  }
};

// 📌 Update procurement advantage (առանց advantages)
const updateAdvantage = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await prisma.procurement_advantage.update({
      where: { id },
      data: {
        title: body.title,
        lang: body.lang,
      },
    });

    res.redirect("/admin/procurement_advantages");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

// 📌 Delete procurement advantage (+ advantages)
const deleteAdvantage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.advantage.deleteMany({ where: { procurementAdvantageId: id } });
    await prisma.procurement_advantage.delete({ where: { id } });

    res.redirect("/admin/procurement_advantages");
  } catch (err) {
    console.error("Error deleting procurement advantage:", err);
    res.status(500).send("Error deleting procurement advantage");
  }
};

// 📌 Advantages update / create / delete
const updateAdvantages = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const advantages = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/advantages\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!advantages[idx]) advantages[idx] = {};
        advantages[idx][field] = body[key];
      }
    });

    const existing = await prisma.advantage.findMany({ where: { procurementAdvantageId: id } });
    const existingIds = existing.map((a) => a.id);
    const submittedIds = advantages.filter((a) => a.id && a.id.trim() !== "").map((a) => a.id);
    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));

    if (idsToDelete.length > 0) {
      await prisma.advantage.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const a of advantages) {
      if (a.id && a.id.trim() !== "") {
        await prisma.advantage.update({ where: { id: a.id }, data: { number: a.number, description: a.description } });
      } else if ((a.number && a.number.trim() !== "") || (a.description && a.description.trim() !== "")) {
        await prisma.advantage.create({
          data: {
            number: a.number || "",
            description: a.description || "",
            procurementAdvantageId: id,
          },
        });
      }
    }

    res.redirect(`/admin/procurement_advantages/edit/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating/creating advantages");
  }
};

module.exports = {
  getAllAdvantages,
  getAdvantageById,
  createAdvantage,
  updateAdvantage,
  deleteAdvantage,
  updateAdvantages,
};
