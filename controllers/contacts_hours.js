const { prisma } = require("../prisma/prisma-client");


const getAllContactHours = async (req, res) => {
  try {
    const contactHours = await prisma.contact_hours.findMany({
      include: { days: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    res.render("contacts_hours/index", {
      title: "Contact Hours",
      contactHours,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contact hours");
  }
};

const getContactHoursById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactHour = await prisma.contact_hours.findUnique({
      where: { id },
      include: { days: { orderBy: { createdAt: "asc" } } },
    });
    if (!contactHour) return res.status(404).send("Contact Hours not found");

    res.render("contacts_hours/update", {
      contactHour,
      id,
      title: contactHour.title,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contact hours");
  }
};

const createContactHours = async (req, res) => {
  try {
    const body = req.body;
    const days = [];

    Object.keys(body).forEach((key) => {
      const match = key.match(/days\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!days[idx]) days[idx] = {};
        days[idx][field] = body[key];
      }
    });

    await prisma.contact_hours.create({
      data: {
        title: body.title || "",
        lang: body.lang || "en",
        days: {
          create: days.map((d) => ({
            day: d.day || "",
            time: d.time || "",
          })),
        },
      },
    });

    res.redirect("/admin/contacts_hours");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating contact hours");
  }
};


const updateContactHours = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await prisma.contact_hours.update({
      where: { id },
      data: {
        title: body.title,
        lang: body.lang,
      },
    });

    res.redirect("/admin/contacts_hours");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

const deleteContactHours = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.days.deleteMany({ where: { contactHoursId: id } });
    await prisma.contact_hours.delete({ where: { id } });

    res.redirect("/admin/contacts_hours");
  } catch (err) {
    console.error("Error deleting contact hours:", err);
    res.status(500).send("Error deleting contact hours");
  }
};

const updateDays = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const days = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/days\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!days[idx]) days[idx] = {};
        days[idx][field] = body[key];
      }
    });

    const existingDays = await prisma.days.findMany({
      where: { contactHoursId: id },
    });
    const existingIds = existingDays.map((d) => d.id);

    const submittedIds = days
      .filter((d) => d.id && d.id.trim() !== "")
      .map((d) => d.id);

    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));
    if (idsToDelete.length > 0) {
      await prisma.days.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const d of days) {
      if (d.id && d.id.trim() !== "") {
        await prisma.days.update({
          where: { id: d.id },
          data: { day: d.day, time: d.time },
        });
      } else if ((d.day && d.day.trim() !== "") || (d.time && d.time.trim() !== "")) {
        await prisma.days.create({
          data: { day: d.day, time: d.time, contactHoursId: id },
        });
      }
    }

    res.redirect(`/admin/contacts_hours/edit/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating/creating days");
  }
};

module.exports = {
  getAllContactHours,
  getContactHoursById,
  createContactHours,
  updateContactHours,
  deleteContactHours,
  updateDays,
};
