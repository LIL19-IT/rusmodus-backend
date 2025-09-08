const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
    try {
        const footersLinks = await prisma.footer_link.findMany();
        const links = await prisma.link.findMany();


        res.status(200).json({
            footersLinks,
            links,


        });
    } catch (error) {
        console.error('Error while fetching footer data:', error);
        res.status(500).json({ message: 'Error while fetching footer data' });
    }
});

module.exports = router;
