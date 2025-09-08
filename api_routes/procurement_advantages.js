const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const advantages = await prisma.procurement_advantage.findMany();
        const advantage = await prisma.advantage.findMany();


        res.status(200).json({
            advantages,
            advantage
        });
    } catch (error) {
        console.error('Error while fetching aboutcompany data:', error);
        res.status(500).json({ message: 'Error while fetching procurement data' });
    }
});

module.exports = router;
