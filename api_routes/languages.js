const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const languages = await prisma.language.findMany();

        res.status(200).json({
            languages,

        });
    } catch (error) {
        console.error('Error while fetching header data:', error);
        res.status(500).json({ message: 'Error while fetching header data' });
    }
});

module.exports = router;
