const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const headings = await prisma.homepage_products_heading.findMany({
    orderBy: { createdAt: 'asc' }
  });

    res.render('homepage_products_heading/homepage_products_heading', {
        headings,
        user,
        title: 'Homepage Products Heading',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('homepage_products_heading/create_homepage_products_heading', {
        error: null,
        user,
        title: 'Create Homepage Products Heading',
        layout: 'base'
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { title, description, lang } = req.body;

    if (!title || !description || !lang) {
        return res.render('homepage_products_heading/create_homepage_products_heading', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage Products Heading',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_products_heading.create({ data: { title, description, lang } });
        res.redirect('/admin/homepage_products_heading'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_products_heading/create_homepage_products_heading', {
            error: 'Failed to create entry',
            user,
            title: 'Create Homepage Products Heading',
            layout: 'base'
        });
    }
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const heading = await prisma.homepage_products_heading.findUnique({ where: { id } });
    if (!heading) return res.redirect('/admin/homepage_products_heading');

    res.render('homepage_products_heading/update_homepage_products_heading', {
        heading,
        error: null,
        user,
        title: 'Update Homepage Products Heading',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { title, description } = req.body;

    const heading = await prisma.homepage_products_heading.findUnique({ where: { id } });
    if (!heading) return res.redirect('/admin/homepage_products_heading');

    if (!title || !description) {
        return res.render('homepage_products_heading/update_homepage_products_heading', {
            error: 'Please fill in all fields',
            heading,
            user,
            title: 'Update Homepage Products Heading',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_products_heading.update({
            where: { id },
            data: { title, description }
        });
        res.redirect('/admin/homepage_products_heading'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_products_heading/update_homepage_products_heading', {
            error: 'Failed to update entry',
            heading,
            user,
            title: 'Update Homepage Products Heading',
            layout: 'base'
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.homepage_products_heading.delete({ where: { id } });
    } catch (err) {
        console.error('Failed to delete:', err);
    }

    res.redirect('/admin/homepage_products_heading'); 
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
