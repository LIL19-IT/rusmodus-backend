const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const btn = await prisma.aboutcompany_btn.findMany();

        res.status(200).json({
          btn
        });
    } catch (error) {
        console.error('Error while fetching aboutcompany data:', error);
        res.status(500).json({ message: 'Error while fetching aquaculture data' });
    }
});

module.exports = router;
