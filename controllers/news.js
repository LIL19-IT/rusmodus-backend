const news = (req, res) => {
    const user = req.session.user;
    res.render('components-news/news', { title: 'Section', user, layout: 'base' })
}

module.exports = {
    news,
}
