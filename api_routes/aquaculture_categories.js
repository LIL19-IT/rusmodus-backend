const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const categories = await prisma.aquaculture_categories.findMany();


        res.status(200).json({
            categories
        });
    } catch (error) {
        console.error('Error while fetching aquaculture data:', error);
        res.status(500).json({ message: 'Error while fetching aquaculture data' });
    }
});

module.exports = router;
