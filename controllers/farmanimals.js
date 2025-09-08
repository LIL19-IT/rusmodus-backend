const farmanimals = (req, res) => {
    const user = req.session.user;
    res.render('components-farmanimals/farmanimals', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    farmanimals,
}