const questions= (req, res) => {
    const user = req.session.user;
    res.render('components-questions/questions', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    questions,
}
