const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const suppliers = await prisma.procurement_supplier.findMany();
        const products = await prisma.product.findMany();

        res.status(200).json({
            suppliers,
            products
        });
    } catch (error) {
        console.error('Error while fetching aboutcompany data:', error);
        res.status(500).json({ message: 'Error while fetching procurement data' });
    }
});

module.exports = router;
