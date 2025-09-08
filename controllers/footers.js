const footers = (req, res) => {
    const user = req.session.user;
    res.render('components-footers/footers', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    footers,
}