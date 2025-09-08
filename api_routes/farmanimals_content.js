const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const contents = await prisma.farmanimals_content.findMany();
        const characteristics = await prisma.characteristics.findMany();

        res.status(200).json({
            contents,
            characteristics
        });
    } catch (error) {
        console.error('Error while fetching farmanimals data:', error);
        res.status(500).json({ message: 'Error while fetching farmanimals data' });
    }
});


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
            components_title,
            components_text,
            vitamin_title,
            vitamin_text,
            shelf_life_title,
            shelf_life_text,
            storage_conditions_title,
            storage_conditions_text,
            characteristics_title,
            feeding_recommendations_title,
            feeding_recommendations_text,
            btn_text,
            farmanimals_name,
            characteristics // սա պետք ա զանգված լինի
        } = req.body;

        // Validation (պարտադիր դաշտերը)
        if (!lang || !title || !description || !farmanimals_name) {
            return res.status(400).json({ message: 'Պարտադիր դաշտերը բացակայում են' });
        }

        // Տվյալների պահպանում (հիմնական + characteristics)
        const newContent = await prisma.farmanimals_content.create({
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
                components_title,
                components_text,
                vitamin_title,
                vitamin_text,
                shelf_life_title,
                shelf_life_text,
                storage_conditions_title,
                storage_conditions_text,
                characteristics_title,
                feeding_recommendations_title,
                feeding_recommendations_text,
                btn_text,
                farmanimals_name,
                characteristics: {
                    create: characteristics?.map(c => ({
                        title: c.title,
                        percent: c.percent
                    })) || []
                }
            },
            include: {
                characteristics: true
            }
        });

        res.status(201).json(newContent);
    } catch (error) {
        console.error('Error while creating farmanimals data:', error);
        res.status(500).json({ message: 'Error while creating farmanimals data' });
    }
});



module.exports = router;
