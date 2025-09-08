const { prisma } = require("../prisma/prisma-client");

// List all schedules
const getAllFootersSchedules = async (req, res) => {
  try {
    const schedules = await prisma.footers_schedule.findMany({
      include: { schedule_list: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    res.render("footers_schedule/index", {
      title: "Footers Schedule",
      schedules,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching schedules");
  }
};

// Get single footer schedule
const getFooterScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const footer = await prisma.footers_schedule.findUnique({
      where: { id },
      include: { schedule_list: { orderBy: { createdAt: "asc" } } },
    });

    if (!footer) return res.status(404).send("Footer schedule not found");

    res.render("footers_schedule/update", {
      footer,
      id,
      title: footer.title,
      user: req.session.user,
      layout: "base",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching footer schedule");
  }
};

// Create schedule
const createFooterSchedule = async (req, res) => {
  try {
    const body = req.body;

    const schedules = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/schedule_list\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!schedules[idx]) schedules[idx] = {};
        schedules[idx][field] = body[key];
      }
    });

    await prisma.footers_schedule.create({
      data: {
        title: body.title || "",
        lang: body.lang || "en",
        schedule_list: {
          create: schedules.map((s) => ({
            lang: s.lang || body.lang || "en",
            days: s.days || "",
            hours: s.hours || "",
          })),
        },
      },
    });

    res.redirect("/admin/footers_schedule");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating footer schedule");
  }
};

// Update footer schedule info
const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await prisma.footers_schedule.update({
      where: { id },
      data: { title: body.title, lang: body.lang },
    });

    res.redirect("/admin/footers_schedule");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

// Delete footer schedule + list
const deleteFooterSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.schedule_list.deleteMany({ where: { footerId: id } });
    await prisma.footers_schedule.delete({ where: { id } });

    res.redirect("/admin/footers_schedule");
  } catch (err) {
    console.error("Error deleting footer schedule:", err);
    res.status(500).send("Error deleting footer schedule");
  }
};

// Update/create/delete schedule_list items
const updateSchedules = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const schedules = [];
    Object.keys(body).forEach((key) => {
      const match = key.match(/schedule_list\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const idx = match[1];
        const field = match[2];
        if (!schedules[idx]) schedules[idx] = {};
        schedules[idx][field] = body[key];
      }
    });

    const existingSchedules = await prisma.schedule_list.findMany({ where: { footerId: id } });
    const existingIds = existingSchedules.map((s) => s.id);
    const submittedIds = schedules.filter((s) => s.id && s.id.trim() !== "").map((s) => s.id);

    // Delete removed
    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));
    if (idsToDelete.length > 0) {
      await prisma.schedule_list.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    // Update or create
    for (const s of schedules) {
      if (s.id && s.id.trim() !== "") {
        await prisma.schedule_list.update({
          where: { id: s.id },
          data: { lang: s.lang, days: s.days, hours: s.hours },
        });
      } else {
        await prisma.schedule_list.create({
          data: { lang: s.lang, days: s.days, hours: s.hours, footerId: id },
        });
      }
    }

    res.redirect(`/admin/footers_schedule/edit/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating/creating schedule list");
  }
};

module.exports = {
  getAllFootersSchedules,
  getFooterScheduleById,
  createFooterSchedule,
  updateData,
  deleteFooterSchedule,
  updateSchedules,
};
