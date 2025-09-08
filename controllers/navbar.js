const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const navbars = await prisma.navbar.findMany({
    orderBy: { createdAt: 'asc' }
  });

    res.render('navbar/navbar', {
        navbars,
        user,
        title: 'Navbars',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('navbar/create_navbar', {
        error: null,
        user,
        title: 'Create Navbar',
        layout: 'base'
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { lang, label, route } = req.body;

    if (!lang || !label || !route) {
        return res.render('navbar/create_navbar', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Navbar',
            layout: 'base'
        });
    }

    try {
        await prisma.navbar.create({
            data: { lang, label, route }
        });

        res.redirect('/admin/navbar'); 
    } catch (err) {
        console.error(err);
        res.render('navbar/create_navbar', {
            error: 'Failed to create navbar',
            user,
            title: 'Create Navbar',
            layout: 'base'
        });
    }
};


const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const navbar = await prisma.navbar.findUnique({ where: { id } });
    if (!navbar) return res.redirect('/admin/navbar');

    res.render('navbar/update_navbar', {
        navbar,
        error: null,
        user,
        title: 'Update Navbar',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { label, route } = req.body;

    const navbar = await prisma.navbar.findUnique({ where: { id } });
    if (!navbar) return res.redirect('/admin/navbar');

    if (!label || !route) {
        return res.render('navbar/update_navbar', {
            error: 'Please fill in all fields',
            navbar,
            user,
            title: 'Update Navbar',
            layout: 'base'
        });
    }

    try {
        await prisma.navbar.update({
            where: { id },
            data: { label, route }
        });

        res.redirect('/admin/navbar'); 
    } catch (err) {
        console.error(err);
        res.render('navbar/update_navbar', {
            error: 'Failed to update navbar',
            navbar,
            user,
            title: 'Update Navbar',
            layout: 'base'
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.navbar.delete({ where: { id } });
    } catch (err) {
        console.error('Failed to delete navbar:', err);
    }

    res.redirect('/admin/navbar'); 
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
