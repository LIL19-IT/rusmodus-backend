const header = (req, res) => {
    const user = req.session.user;
    res.render('components-header/header', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    header,
}
