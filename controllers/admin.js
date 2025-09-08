const admin = (req, res) => {
  const user = req.session.user;

  res.render('admin/admin', {
    title: 'Admin',
    user,
    layout: 'base',
    basePath: '/',
  })
};

module.exports = {
  admin,
};
