const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const content = await prisma.news_content.findMany();

        res.status(200).json({
            content
        });
    } catch (error) {
        console.error('Error while fetching farmanimals data:', error);
        res.status(500).json({ message: 'Error while fetching news data' });
    }
});

module.exports = router;
