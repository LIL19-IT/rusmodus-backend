const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');

const register_get = (req, res) => {
    const user = req.session.user;
    res.render('auth/register', { error: null, title: 'Register Page', user, layout: 'base' });
}

const register_post = async (req, res) => {
    const user = req.session.user;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('auth/register', { error: 'Please fill in all fields', title: 'Register Page', user, layout: 'base' });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
        return res.render('auth/register', { error: 'Username already exists', title: 'Register Page', user, layout: 'base' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });

    req.session.user = { username: newUser.username, id: newUser.id };
    res.redirect('/admin');
}

const login_get = (req, res) => {
    const user = req.session.user;
    res.render('auth/login', { error: null, title: 'Login Page', user, layout: 'base' });
}



const login_post = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('auth/login', { error: 'Please fill in all fields', title: 'Login Page', user: null, layout: 'base' });
    }

    const userFromDb = await prisma.user.findUnique({ where: { username } });

    if (!userFromDb || !(await bcrypt.compare(password, userFromDb.password))) {
        return res.render('auth/login', { error: 'Invalid credentials', title: 'Login Page', user: null, layout: 'base' });
    }

    req.session.user = { username: userFromDb.username, id: userFromDb.id };
    res.redirect('/admin');
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
}

module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout,
}
