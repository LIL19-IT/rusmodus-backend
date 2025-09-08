const contacts = (req, res) => {
    const user = req.session.user;
    res.render('components-contacts/contacts', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    contacts,
}