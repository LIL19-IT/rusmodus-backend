const aquaculture = (req, res) => {
    const user = req.session.user;
    res.render('components-aquaculture/aquaculture', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    aquaculture,
}