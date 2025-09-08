const homepage = (req, res) => {
    const user = req.session.user;
    res.render('components-homepage/homepage', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    homepage,
}
