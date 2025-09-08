const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

// GET all
router.get('/', async (req, res) => {
  try {
    const contents = await prisma.aquaculture_content.findMany({
      include: { characteristics: true }
    });
    res.status(200).json(contents);
  } catch (error) {
    console.error('Error while fetching aquaculture data:', error);
    res.status(500).json({ message: 'Error while fetching aquaculture data' });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const {
      lang,
      sub_title,
      sub_title1,
      sub_title2,
      thumbnail,
      img_url,
      title,
      description,
      type_title,
      type_text,
      size_title,
      size_text,
      components_title,
      components_text,
      vitamin_title,
      vitamin_text,
      shelf_life_title,
      shelf_life_text,
      storage_conditions_title,
      storage_conditions_text,
      characteristics_title,
      btn_text,
      aquaculture_name,
      characteristics // <- array of {title, percent}
    } = req.body;

    console.log(req.body); // Debug

    const newContent = await prisma.aquaculture_content.create({
      data: {
        lang,
        sub_title,
        sub_title1,
        sub_title2,
        thumbnail,
        img_url,
        title,
        description,
        type_title,
        type_text,
        size_title,
        size_text,
        components_title,
        components_text,
        vitamin_title,
        vitamin_text,
        shelf_life_title,
        shelf_life_text,
        storage_conditions_title,
        storage_conditions_text,
        characteristics_title,
        btn_text,
        aquaculture_name,
        characteristics: {
          create: Array.isArray(characteristics)
            ? characteristics.map(c => ({
                title: c.title,
                percent: c.percent
              }))
            : []
        }
      },
      include: { characteristics: true }
    });

    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error while creating aquaculture data:', error);
    res.status(500).json({ message: 'Error while creating aquaculture data', error: error.message });
  }
});

module.exports = router;
