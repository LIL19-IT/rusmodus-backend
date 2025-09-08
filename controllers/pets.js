const pets = (req, res) => {
    const user = req.session.user;
    res.render('components-pets/pets', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    pets,
}
