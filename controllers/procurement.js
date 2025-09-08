const procurement = (req, res) => {
    const user = req.session.user;
    res.render('components-procurement/procurement', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    procurement,
}
