const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const homepageIntros = await prisma.homepage_intro.findMany({
    orderBy: { createdAt: 'asc' }
  });

    res.render('homepage_intro/homepage_intro', {
        homepageIntros,
        user,
        title: 'Homepage Intro',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('homepage_intro/create_homepage_intro', {
        error: null,
        user,
        title: 'Create Homepage Intro',
        layout: 'base'
    });
};


const add = async (req, res) => {
    const user = req.session.user;
    const { video_src, lang, title: introTitle, description } = req.body;

    if (!video_src || !lang || !introTitle || !description) {
        return res.render('homepage_intro/create_homepage_intro', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage Intro',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_intro.create({
            data: {
                video_src,
                lang,
                title: introTitle,
                description
            }
        });
        res.redirect('/admin/homepage_intro'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_intro/create_homepage_intro', {
            error: 'Failed to create entry',
            user,
            title: 'Create Homepage Intro',
            layout: 'base'
        });
    }
};


const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const homepageIntro = await prisma.homepage_intro.findUnique({ where: { id } });
    if (!homepageIntro) return res.redirect('/admin/homepage_intro');

    res.render('homepage_intro/update_homepage_intro', {
        homepageIntro,
        error: null,
        user,
        title: 'Update Homepage Intro',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { video_src, title: introTitle, description } = req.body;

    const homepageIntro = await prisma.homepage_intro.findUnique({ where: { id } });
    if (!homepageIntro) return res.redirect('/admin/homepage_intro');

    if (!video_src || !introTitle || !description) {
        return res.render('homepage_intro/update_homepage_intro', {
            error: 'Please fill in all fields',
            homepageIntro,
            user,
            title: 'Update Homepage Intro',
            layout: 'base'
        });
    }

    try {
        await prisma.homepage_intro.update({
            where: { id },
            data: {
                video_src,
                title: introTitle,
                description
            }
        });
        res.redirect('/admin/homepage_intro'); 
    } catch (err) {
        console.error(err);
        res.render('homepage_intro/update_homepage_intro', {
            error: 'Failed to update entry',
            homepageIntro,
            user,
            title: 'Update Homepage Intro',
            layout: 'base'
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.homepage_intro.delete({ where: { id } });
    } catch (err) {
        console.error('Failed to delete:', err);
    }

    res.redirect('/admin/homepage_intro'); 
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
