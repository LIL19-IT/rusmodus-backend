const { prisma } = require('../prisma/prisma-client');


const getAllAquacultureContent = async (req, res) => {
  try {
    const contents = await prisma.aquaculture_content.findMany({
      select: { id: true, img_url: true, title: true },
      orderBy: { createdAt: 'asc' }
    });

    res.render('aquaculture_content/index', {
      contents,
      title: 'Aquaculture',
      user: req.session.user,
      layout: 'base',
    });
  } catch (error) {
    console.error('Error fetching aquaculture content:', error);
    res.status(500).send('Error fetching contents');
  }
};

const getAquacultureContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await prisma.aquaculture_content.findUnique({
      where: { id },
      include: { characteristics: { orderBy: { createdAt: 'asc' } } }
    });

    if (!content) return res.status(404).send('Content not found');

    res.render('aquaculture_content/update', {
      content,
      id,
      title: content.title,
      user: req.session.user,
      layout: 'base',
    });
  } catch (error) {
    console.error('Error fetching aquaculture content:', error);
    res.status(500).send('Error fetching content');
  }
};

const createAquacultureContent = async (req, res) => {
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

    await prisma.aquaculture_content.create({
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
        size_title: body.size_title || "",
        size_text: body.size_text || "",
        components_title: body.components_title || "",
        components_text: body.components_text || "",
        vitamin_title: body.vitamin_title || "",
        vitamin_text: body.vitamin_text || "",
        shelf_life_title: body.shelf_life_title || "",
        shelf_life_text: body.shelf_life_text || "",
        storage_conditions_title: body.storage_conditions_title || "",
        storage_conditions_text: body.storage_conditions_text || "",
        characteristics_title: body.characteristics_title || "Default Title",
        btn_text: body.btn_text || "",
        aquaculture_name: body.aquaculture_name || "",
        characteristics: {
          create: characteristics.map(c => ({
            title: c.title || "",
            percent: c.percent || ""
          }))
        }
      },
    });

    res.redirect("/admin/aquaculture_content");
  } catch (error) {
    console.error('Error creating aquaculture content:', error);
    res.status(500).json({ error: 'Error creating content', details: error.message });
  }
};

const deleteAquacultureContent = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.aquaculture_content.delete({ where: { id } });

    res.redirect('/admin/aquaculture_content');
  } catch (error) {
    console.error('Error deleting aquaculture content:', error);
    res.status(500).send('Error deleting content');
  }
};

const updateAquacultureData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await prisma.aquaculture_content.update({
      where: { id },
      data,
    });

    res.redirect('/admin/aquaculture_content');
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

    const existingChars = await prisma.characteristic.findMany({
      where: { aquacultureContentId: id },
    });
    const existingIds = existingChars.map((c) => c.id); 
    
    const submittedIds = characteristics
      .filter((c) => c.id && c.id.trim() !== "")
      .map((c) => Number(c.id));

    const idsToDelete = existingIds.filter((eid) => !submittedIds.includes(eid));
    if (idsToDelete.length > 0) {
      await prisma.characteristic.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    for (let char of characteristics) {
      if (char.id && char.id.trim() !== "") {
        await prisma.characteristic.update({
          where: { id: Number(char.id) }, 
          data: {
            title: char.title,
            percent: char.percent,
          },
        });
      } else {
        await prisma.characteristic.create({
          data: {
            title: char.title,
            percent: char.percent,
            aquacultureContentId: id,
          },
        });
      }
    }

    res.redirect(`/admin/aquaculture_content/detail/${id}`);
  } catch (error) {
    console.error("Error in updateCharacteristics:", error);
    res.status(500).send("Error updating/creating characteristics");
  }
};


module.exports = {
  getAllAquacultureContent,
  createAquacultureContent,
  deleteAquacultureContent,
  getAquacultureContentById,
  updateAquacultureData,
  updateCharacteristics,
};
