const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const products = await prisma.homepage_products.findMany();

        res.status(200).json({
            products
        });
    } catch (error) {
        console.error('Error while fetching homepage data:', error);
        res.status(500).json({ message: 'Error while fetching homepage data' });
    }
});

module.exports = router;
