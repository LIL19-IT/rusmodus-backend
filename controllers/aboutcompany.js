const aboutcompany = (req, res) => {
    const user = req.session.user;
    res.render('components-aboutcompany/aboutcompany', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    aboutcompany,
}
