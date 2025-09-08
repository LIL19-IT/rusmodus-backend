const { prisma } = require('../prisma/prisma-client');

// ================== CONTROLLERS ==================

const getAllFarmAnimalsContent = async (req, res) => {
  try {
    const contents = await prisma.farmanimals_content.findMany({
      select: { id: true, img_url: true, title: true },
      orderBy: { createdAt: 'asc' }
    });

    res.render('farmanimals_content/index', {
      contents,
      title: 'Farm Animals',
      user: req.session.user,
      layout: 'base',
    });
  } catch (error) {
    console.error('Error fetching farmanimals content:', error);
    res.status(500).send('Error fetching contents');
  }
};

const getFarmAnimalContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await prisma.farmanimals_content.findUnique({
      where: { id },
      include: { characteristics: { orderBy: { createdAt: 'asc' } } }
    });

    if (!content) return res.status(404).send('Content not found');

    res.render('farmanimals_content/update', {
      content,
      id,
      title: content.title,
      user: req.session.user,
      layout: 'base',
    });
  } catch (error) {
    console.error('Error fetching farmanimal content:', error);
    res.status(500).send('Error fetching content');
  }
};

const createFarmAnimalContent = async (req, res) => {
  try {
    const body = req.body;
    const characteristics = [];

    Object.keys(body).forEach((key) => {
      const match = key.match(/characteristics\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = match[1];
        const field = match[2];

        if (!characteristics[index]) characteristics[index] = {};
        characteristics[index][field] = body[key];
      }
    });

    await prisma.farmanimals_content.create({
      data: {
        img_url: body.img_url || "",
        lang: body.lang || "en",
        title: body.title || "",
        sub_title: body.sub_title || "",
        sub_title1: body.sub_title1 || "",
        sub_title2: body.sub_title2 || "",
        thumbnail: body.thumbnail || "",
        description: body.description || "",
        type_title: body.type_title || "",
        type_text: body.type_text || "",
        components_title: body.components_title || "",
        components_text: body.components_text || "",
        vitamin_title: body.vitamin_title || "",
        vitamin_text: body.vitamin_text || "",
        shelf_life_title: body.shelf_life_title || "",
        shelf_life_text: body.shelf_life_text || "",
        storage_conditions_title: body.storage_conditions_title || "",
        storage_conditions_text: body.storage_conditions_text || "",
        characteristics_title: body.characteristics_title || "",
        feeding_recommendations_title: body.feeding_recommendations_title || "",
        feeding_recommendations_text: body.feeding_recommendations_text || "",
        btn_text: body.btn_text || "",
        farmanimals_name: body.farmanimals_name || "",
        characteristics: {
          create: characteristics.map(c => ({
            title: c.title || "",
            percent: c.percent || ""
          }))
        }
      },
    });

    res.redirect("/admin/farmanimals_content");
  } catch (error) {
    console.error('Error creating farm animal content:', error);
    res.status(500).json({ error: 'Error creating content', details: error.message });
  }
};

const deleteFarmAnimalContent = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.farmanimals_content.delete({ where: { id } });

    res.redirect('/admin/farmanimals_content');
  } catch (error) {
    console.error('Error deleting farm animal content:', error);
    res.status(500).send('Error deleting content');
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await prisma.farmanimals_content.update({
      where: { id },
      data,
    });

    res.redirect('/admin/farmanimals_content');
  } catch (error) {
    console.error(error);
    res.status(500).send("Update failed");
  }
};


const updateCharacteristics = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const characteristics = [];

    Object.keys(body).forEach((key) => {
      const match = key.match(/characteristics\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = match[1];
        const field = match[2];

        if (!characteristics[index]) {
          characteristics[index] = {};
        }
        characteristics[index][field] = body[key];
      }
    });

    const existingChars = await prisma.characteristics.findMany({ where: { farmAnimalId: id } });
    const existingIds = existingChars.map(c => c.id);

    // IDs submitted in the form
    const submittedIds = characteristics.filter(c => c.id && c.id.trim() !== "").map(c => c.id);

    // Delete characteristics that were removed from the form
    const idsToDelete = existingIds.filter(id => !submittedIds.includes(id));
    await prisma.characteristics.deleteMany({ where: { id: { in: idsToDelete } } });

    // Update or create characteristics
    for (let char of characteristics) {
      if (char.id && char.id.trim() !== "") {
        await prisma.characteristics.update({
          where: { id: char.id },
          data: { title: char.title, percent: char.percent }
        });
      } else {
        await prisma.characteristics.create({
          data: { title: char.title, percent: char.percent, farmAnimalId: id }
        });
      }
    }

    res.redirect(`/admin/farmanimals_content/detail/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating/creating characteristics");
  }
};

module.exports = {
  getAllFarmAnimalsContent,
  createFarmAnimalContent,
  deleteFarmAnimalContent,
  getFarmAnimalContentById,
  updateData,
  updateCharacteristics,
};
