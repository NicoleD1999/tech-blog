const router = require('express').Router();
const {User, Post} = require('../../models');

router.get('/:user_id', async (req, res)=> {
    try{
        const userData = await User.findByPk(req.params.user_id, {
            include: [
                {
                    model: Post
                }
            ]
        })
        const posts = userData.get({ plain: true});
        console.log(posts)
        res.render('dashboard', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id })

    }catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:user_id', async (req, res) => {
    try {
        const message = await Post.create({
            ...req.body,
            user_id: req.params.user_id 
        });
        res.json({message})
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;