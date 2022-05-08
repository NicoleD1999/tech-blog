const router = require('express').Router();
const {User, Post} = require('../../models');

router.get('/:id', async (req, res)=> {
    try{
        const userData = await User.findByPk(req.session.id, {
            include: [
                {
                    model: Post
                }
            ]
        })
        const posts = userData.get({ plain: true});
        console.log(posts)
        res.render('dashboard', {posts})

    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;