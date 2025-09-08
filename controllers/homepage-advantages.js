const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const homepageAdvantages = await prisma.homepage_advantages.findMany({
    orderBy: { createdAt: 'asc' }
  });
    res.render('homepage-advantages/homepage_advantages', {
        homepageAdvantages,
        user,
        title: 'Homepage Advantages',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;
    res.render('homepage-advantages/create_homepage_advantage', {
        error: null,
        user,
        title: 'Create Homepage Advantage',
        layout: 'base',
        lang: '',
        img_url: '',
        titleValue: '',
        description: ''
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { img_url, title, description, lang } = req.body;

    if (!img_url || !title || !description || !lang) {
        return res.render('homepage-advantages/create_homepage_advantage', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage Advantage',
            layout: 'base',
            img_url,
            titleValue: title,
            description,
            lang
        });
    }

    try {
        await prisma.homepage_advantages.create({ data: { img_url, title, description, lang } });
        res.redirect('/admin/homepage-advantages'); 
    } catch (err) {
        console.error(err);
        res.render('homepage-advantages/create_homepage_advantage', {
            error: 'Failed to create entry',
            user,
            title: 'Create Homepage Advantage',
            layout: 'base',
            img_url,
            titleValue: title,
            description,
            lang
        });
    }
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const homepageAdvantage = await prisma.homepage_advantages.findUnique({ where: { id } });
    if (!homepageAdvantage) return res.redirect('/admin/homepage-advantages');

    res.render('homepage-advantages/update_homepage_advantage', {
        homepageAdvantage,
        error: null,
        user,
        title: 'Update Homepage Advantage',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { img_url, title, description } = req.body;

    const homepageAdvantage = await prisma.homepage_advantages.findUnique({ where: { id } });
    if (!homepageAdvantage) return res.redirect('/admin/homepage-advantages');

    if (!img_url || !title || !description) {
        return res.render('homepage-advantages/update_homepage_advantage', {
            homepageAdvantage: { ...homepageAdvantage, img_url, title, description },
            error: 'Please fill in all fields',
            user,
            title: 'Update Homepage Advantage',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_advantages.update({
            where: { id },
            data: { img_url, title, description }
        });
        res.redirect('/admin/homepage-advantages'); 
    } catch (err) {
        console.error(err);
        res.render('homepage-advantages/update_homepage_advantage', {
            homepageAdvantage: { ...homepageAdvantage, img_url, title, description },
            error: 'Failed to update entry',
            user,
            title: 'Update Homepage Advantage',
            layout: 'base'
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.homepage_advantages.delete({ where: { id } });
    } catch (err) {
        console.error('Failed to delete:', err);
    }

    res.redirect('/admin/homepage-advantages'); 
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
