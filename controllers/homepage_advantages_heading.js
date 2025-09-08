const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const headings = await prisma.homepage_advantages_heading.findMany({
    orderBy: { createdAt: 'asc' }
  });

    res.render('homepage_advantages_heading/homepage_advantages_heading', {
        headings,
        user,
        title: 'Homepage Advantages Heading',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('homepage_advantages_heading/create_homepage_advantages_heading', {
        error: null,
        user,
        title: 'Create Homepage Advantages Heading',
        layout: 'base'
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { title, img_url, lang } = req.body;

    if (!title || !img_url || !lang) {
        return res.render('homepage_advantages_heading/create_homepage_advantages_heading', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage Advantages Heading',
            layout: 'base'
        });
    }

    await prisma.homepage_advantages_heading.create({
        data: {
            title,
            img_url,
            lang
        }
    });

    res.redirect('/admin/homepage_advantages_heading');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const heading = await prisma.homepage_advantages_heading.findUnique({ where: { id } });

    if (!heading) return res.redirect('/admin/homepage_advantages_heading');

    res.render('homepage_advantages_heading/update_homepage_advantages_heading', {
        heading,
        error: null,
        user,
        title: 'Update Homepage Advantages Heading',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { title, link_news, img_url } = req.body;

    const heading = await prisma.homepage_advantages_heading.findUnique({ where: { id } });

    if (!heading) return res.redirect('/admin/homepage_advantages_heading');

    if (!title || link_news || !img_url) {
        return res.render('homepage_advantages_heading/update_homepage_advantages_heading', {
            error: 'Please fill in all fields',
            heading,
            user,
            title: 'Update Homepage Advantages Heading',
            layout: 'base'
        });
    }

    await prisma.homepage_advantages_heading.update({
        where: { id },
        data: {
            title,
            link_news,
            img_url
        }
    });

    res.redirect('/admin/homepage_advantages_heading');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.homepage_advantages_heading.delete({
        where: { id }
    });

    res.redirect('/admin/homepage_advantages_heading');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
