const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
// const messageRoutes = require('./postRoutes');
const signupRoutes = require('./signupRoute');


router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);

module.exports = router;