const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const feedback = await prisma.homepage_feedback.findMany();

        res.status(200).json({
            feedback
        });
    } catch (error) {
        console.error('Error while fetching homepage data:', error);
        res.status(500).json({ message: 'Error while fetching homepage data' });
    }
});

module.exports = router;
