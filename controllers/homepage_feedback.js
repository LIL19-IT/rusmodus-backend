const { prisma } = require('../prisma/prisma-client');

const list_page = async (req, res) => {
    const user = req.session.user;
    const feedbacks = await prisma.homepage_feedback.findMany({
    orderBy: { createdAt: 'asc' }
  });

    res.render('homepage_feedback/homepage_feedback', {
        feedbacks,
        user,
        title: 'Homepage Feedback',
        layout: 'base'
    });
};

const create_page = async (req, res) => {
    const user = req.session.user;

    res.render('homepage_feedback/create_homepage_feedback', {
        error: null,
        user,
        title: 'Create Homepage Feedback',
        layout: 'base'
    });
};

const add = async (req, res) => {
    const user = req.session.user;
    const {
        title,
        description,
        checkbox_text,
        btn_text,
        placeholder_name,
        placeholder_phone,
        placeholder_email,
        placeholder_question,
        lang
    } = req.body;

    if (
        !title || !description || !checkbox_text || !btn_text ||
        !placeholder_name || !placeholder_phone || !placeholder_email ||
        !placeholder_question || !lang
    ) {
        return res.render('homepage_feedback/create_homepage_feedback', {
            error: 'Please fill in all fields',
            user,
            title: 'Create Homepage Feedback',
            layout: 'base'
        });
    }

    await prisma.homepage_feedback.create({
        data: {
            title,
            description,
            checkbox_text,
            btn_text,
            placeholder_name,
            placeholder_phone,
            placeholder_email,
            placeholder_question,
            lang
        }
    });

    res.redirect('/admin/homepage_feedback');
};

const edit_page = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    const feedback = await prisma.homepage_feedback.findUnique({ where: { id } });

    if (!feedback) return res.redirect('/admin/homepage_feedback');

    res.render('homepage_feedback/update_homepage_feedback', {
        feedback,
        error: null,
        user,
        title: 'Update Homepage Feedback',
        layout: 'base'
    });
};

const edit = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const {
        title,
        description,
        checkbox_text,
        btn_text,
        placeholder_name,
        placeholder_phone,
        placeholder_email,
        placeholder_question,
    } = req.body;

    const feedback = await prisma.homepage_feedback.findUnique({ where: { id } });

    if (!feedback) return res.redirect('/admin/homepage_feedback');

    if (
        !title || !description || !checkbox_text || !btn_text ||
        !placeholder_name || !placeholder_phone || !placeholder_email ||
        !placeholder_question
    ) {
        return res.render('homepage_feedback/update_homepage_feedback', {
            error: 'Please fill in all fields',
            feedback,
            user,
            title: 'Update Homepage Feedback',
            layout: 'base'
        });
    }

    await prisma.homepage_feedback.update({
        where: { id },
        data: {
            title,
            description,
            checkbox_text,
            btn_text,
            placeholder_name,
            placeholder_phone,
            placeholder_email,
            placeholder_question,
        }
    });

    res.redirect('/admin/homepage_feedback');
};

const remove = async (req, res) => {
    const id = req.params.id;

    await prisma.homepage_feedback.delete({
        where: { id }
    });

    res.redirect('/admin/homepage_feedback');
};

module.exports = {
    list_page,
    create_page,
    add,
    edit_page,
    edit,
    remove
};
