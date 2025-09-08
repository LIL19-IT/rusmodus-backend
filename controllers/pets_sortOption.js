const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const sortOptions = await prisma.pets_sortOption.findMany({
    orderBy: { createdAt: 'asc' }
  });
    res.render('pets_sortOption/pets_sortOption', {
        sortOptions,
        user,
        title: 'Pets Sort Options',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;
    res.render('pets_sortOption/create_pets_sortOption', {
        error: null,
        sortOption: {}, 
        user,
        title: 'Create Sort Option',
        layout: 'base'
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const { name, lang } = req.body;

    if (!name || !lang) {
        return res.render('pets_sortOption/create_pets_sortOption', {
            error: 'Please fill in all fields',
            sortOption: req.body,
            user,
            title: 'Create Sort Option',
            layout: 'base'
        });
    }

    await prisma.pets_sortOption.create({
        data: { name, lang }
    });

    res.redirect('/admin/pets_sortOption');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const sortOption = await prisma.pets_sortOption.findUnique({ where: { id } });
    if (!sortOption) return res.redirect('/admin/pets_sortOption'); 

    res.render('pets_sortOption/update_pets_sortOption', {
        sortOption,
        error: null,
        user,
        title: 'Update Sort Option',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const { name } = req.body;

    const sortOption = await prisma.pets_sortOption.findUnique({ where: { id } });
    if (!sortOption) return res.redirect('/admin/pets_sortOption');

    if (!name) {
        return res.render('pets_sortOption/update_pets_sortOption', {
            error: 'Please fill in all fields',
            sortOption: { ...req.body, id },
            user,
            title: 'Update Sort Option',
            layout: 'base'
        });
    }

    await prisma.pets_sortOption.update({
        where: { id },
        data: { name }
    });

    res.redirect('/admin/pets_sortOption'); 
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.pets_sortOption.delete({ where: { id } });
    res.redirect('/admin/pets_sortOption'); 
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
