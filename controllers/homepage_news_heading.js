const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const headings = await prisma.homepage_news_heading.findMany({
    orderBy: { createdAt: 'asc' }
  });

    res.render('homepage_news_heading/homepage_news_heading', {
        headings,
        user,
        title: 'Homepage News Headings',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('homepage_news_heading/create_homepage_news_heading', {
        error: null,
        user,
        title: 'Create Homepage News Heading',
        layout: 'base'
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { title, link_news, route, lang } = req.body;

    if (!title || !link_news || !route || !lang) {
        return res.render('homepage_news_heading/create_homepage_news_heading', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage News Heading',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_news_heading.create({
            data: { title, link_news, route, lang }
        });
        res.redirect('/admin/homepage_news_heading'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_news_heading/create_homepage_news_heading', {
            error: 'Failed to create entry',
            user,
            title: 'Create Homepage News Heading',
            layout: 'base'
        });
    }
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const heading = await prisma.homepage_news_heading.findUnique({ where: { id } });
    if (!heading) return res.redirect('/admin/homepage_news_heading');

    res.render('homepage_news_heading/update_homepage_news_heading', {
        heading,
        error: null,
        user,
        title: 'Update Homepage News Heading',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { title, link_news, route } = req.body;

    const heading = await prisma.homepage_news_heading.findUnique({ where: { id } });
    if (!heading) return res.redirect('/admin/homepage_news_heading');

    if (!title || !link_news || !route) {
        return res.render('homepage_news_heading/update_homepage_news_heading', {
            error: 'Please fill in all fields',
            heading,
            user,
            title: 'Update Homepage News Heading',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_news_heading.update({
            where: { id },
            data: { title, link_news, route }
        });
        res.redirect('/admin/homepage_news_heading'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_news_heading/update_homepage_news_heading', {
            error: 'Failed to update entry',
            heading,
            user,
            title: 'Update Homepage News Heading',
            layout: 'base'
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.homepage_news_heading.delete({ where: { id } });
    } catch (err) {
        console.error('Failed to delete:', err);
    }

    res.redirect('/admin/homepage_news_heading'); 
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
