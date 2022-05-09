const router = require('express').Router();
// const loginRoutes = require('./loginRoutes');
// const signupRoutes = require('./signupRoutes');
const userRoutes = require('./userRoutes')
const dashboard = require('./dashboardRoutes')

router.use('/dashboard', dashboard);
// router.use('/login', loginRoutes);
// router.use('/signup', signupRoutes);

module.exports = router;