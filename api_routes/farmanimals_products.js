const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const products = await prisma.farmanimals_product.findMany();

        res.status(200).json({
            products
        });
    } catch (error) {
        console.error('Error while fetching farmanimals data:', error);
        res.status(500).json({ message: 'Error while fetching farmanimals data' });
    }
});

module.exports = router;
