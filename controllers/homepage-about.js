const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const homepageAbouts = await prisma.homepage_about.findMany({
    orderBy: { createdAt: 'asc' }
  });
    res.render('homepage-about/homepage_about', {
        homepageAbouts,
        user,
        title: 'Homepage About',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;
    res.render('homepage-about/create_homepage_about', {
        error: null,
        user,
        title: 'Create Homepage About',
        layout: 'base',
        titleValue: '',
        sub_title: '',
        description1: '',
        description2: '',
        img1_url: '',
        img2_url: '',
        btn_text: '',
        route: '',
        lang: ''
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const {
        title,
        sub_title,
        description1,
        description2,
        img1_url,
        img2_url,
        btn_text,
        route,
        lang
    } = req.body;

    if (!title || !sub_title || !description1 || !description2 || !img1_url || !img2_url || !btn_text || !route || !lang) {
        return res.render('homepage-about/create_homepage_about', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage About',
            layout: 'base',
            titleValue: title,
            sub_title,
            description1,
            description2,
            img1_url,
            img2_url,
            btn_text,
            route,
            lang
        });
    }

    await prisma.homepage_about.create({
        data: {
            title,
            sub_title,
            description1,
            description2,
            img1_url,
            img2_url,
            btn_text,
            route,
            lang
        }
    });

    res.redirect('/admin/homepage-about');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const homepageAbout = await prisma.homepage_about.findUnique({ where: { id } });

    if (!homepageAbout) return res.redirect('/homepage-about');

    res.render('homepage-about/update_homepage_about', {
        homepageAbout,
        error: null,
        user,
        title: 'Update Homepage About',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const {
        title,
        sub_title,
        description1,
        description2,
        img1_url,
        img2_url,
        btn_text,
        route
    } = req.body;

    const homepageAbout = await prisma.homepage_about.findUnique({ where: { id } });

    if (!homepageAbout) return res.redirect('/homepage-about');

    if (!title || !sub_title || !description1 || !description2 || !img1_url || !img2_url || !btn_text || !route ) {
        return res.render('homepage-about/update_homepage_about', {
            homepageAbout: { ...homepageAbout, title, sub_title, description1, description2, img1_url, img2_url, btn_text, route },
            error: 'Please fill in all fields',
            user,
            title: 'Update Homepage About',
            layout: 'base'
        });
    }

    await prisma.homepage_about.update({
        where: { id },
        data: {
            title,
            sub_title,
            description1,
            description2,
            img1_url,
            img2_url,
            btn_text,
            route,
        }
    });

    res.redirect('/admin/homepage-about');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.homepage_about.delete({
        where: { id }
    });

    res.redirect('/admin/homepage-about');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
