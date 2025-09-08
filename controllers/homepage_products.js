const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const products = await prisma.homepage_products.findMany({
    orderBy: { createdAt: 'asc' }
  });

    res.render('homepage_products/homepage_products', {
        products,
        user,
        title: 'Homepage Products',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('homepage_products/create_homepage_products', {
        error: null,
        user,
        title: 'Create Homepage Product',
        layout: 'base'
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { title, route, img_url, lang } = req.body;

    if (!title || !route || !img_url || !lang) {
        return res.render('homepage_products/create_homepage_products', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage Product',
            layout: 'base'
        });
    }

    await prisma.homepage_products.create({
        data: {
            title,
            route,
            img_url,
            lang
        }
    });

    res.redirect('/admin/homepage_products');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const product = await prisma.homepage_products.findUnique({ where: { id } });

    if (!product) return res.redirect('/homepage_products');

    res.render('homepage_products/update_homepage_products', {
        product,
        error: null,
        user,
        title: 'Update Homepage Product',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { title, route, img_url} = req.body;

    const product = await prisma.homepage_products.findUnique({ where: { id } });

    if (!product) return res.redirect('/homepage_products');

    if (!title || !route || !img_url ) {
        return res.render('homepage_products/update_homepage_products', {
            error: 'Please fill in all fields',
            product,
            user,
            title: 'Update Homepage Product',
            layout: 'base'
        });
    }

    await prisma.homepage_products.update({
        where: { id },
        data: {
            title,
            route,
            img_url,
        }
    });

    res.redirect('/admin/homepage_products');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.homepage_products.delete({
        where: { id }
    });

    res.redirect('/admin/homepage_products');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
