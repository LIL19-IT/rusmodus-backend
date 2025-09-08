const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const credit = await prisma.footer_credit.findFirst();

        res.status(200).json({
            credit

        });
    } catch (error) {
        console.error('Error while fetching footer data:', error);
        res.status(500).json({ message: 'Error while fetching footer data' });
    }
});

module.exports = router;
