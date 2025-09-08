const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const homepageNews = await prisma.homepage_news.findMany({
    orderBy: { createdAt: 'asc' }
  });
    res.render('homepage_news/homepage_news', {
        homepageNews,
        user,
        title: 'Homepage News',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('homepage_news/create_homepage_news', {
        error: null,
        user,
        title: 'Create Homepage News',
        layout: 'base',
        lang: '',
        img_url: '',
        titleValue: '',
        description: '',
        data: '',
        link_about: ''
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { img_url, data, title: newsTitle, link_about, lang } = req.body;

    if (!img_url || !data || !newsTitle || !link_about || !lang) {
        return res.render('homepage_news/create_homepage_news', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage News',
            layout: 'base',
            lang,
            img_url,
            titleValue: newsTitle,
            description: data,
            data,
            link_about
        });
    }

    try {
        await prisma.homepage_news.create({
            data: {
                img_url,
                data,
                title: newsTitle,
                link_about,
                lang
            }
        });
        res.redirect('/admin/homepage_news'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_news/create_homepage_news', {
            error: 'Failed to create entry',
            user,
            title: 'Create Homepage News',
            layout: 'base',
            lang,
            img_url,
            titleValue: newsTitle,
            description: data,
            data,
            link_about
        });
    }
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const homepageNews = await prisma.homepage_news.findUnique({ where: { id } });
    if (!homepageNews) return res.redirect('/admin/homepage_news');

    res.render('homepage_news/update_homepage_news', {
        homepageNews,
        error: null,
        user,
        title: 'Update Homepage News',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { img_url, data, title: newsTitle, link_about } = req.body;

    const homepageNews = await prisma.homepage_news.findUnique({ where: { id } });
    if (!homepageNews) return res.redirect('/admin/homepage_news');

    if (!img_url || !data || !newsTitle || !link_about) {
        return res.render('homepage_news/update_homepage_news', {
            error: 'Please fill in all fields',
            homepageNews,
            user,
            title: 'Update Homepage News',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_news.update({
            where: { id },
            data: { img_url, data, title: newsTitle, link_about }
        });
        res.redirect('/admin/homepage_news'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_news/update_homepage_news', {
            error: 'Failed to update entry',
            homepageNews,
            user,
            title: 'Update Homepage News',
            layout: 'base'
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.homepage_news.delete({ where: { id } });
    } catch (err) {
        console.error('Failed to delete:', err);
    }

    res.redirect('/admin/homepage_news'); 
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
