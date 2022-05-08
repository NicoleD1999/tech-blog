const { Post, Comments, User } = require('../models');
const auth = require('../utils/auth');

let logged_in;
const router = require('express').Router();
// const { User, Post } = require('../models');

router.get('/', auth, async (req, res) => {
    try {
       logged_in = req.session.logged_in
      res.render('home');

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

   res.render('login');
});

router.get('/signup',  (req, res)=> {
  try {

    res.render('signup');
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//view all posts
router.get('/posts',  (req, res)=> {
    try{
        const postData = await Post.findAll()
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('posts', { posts });

    }catch (err) {
        res.status(500).json(err);
    }
});
//view single posts by their id
router.get('/:id', async (req, res) => {
    try {
        const message = await Post.findByPk(req.params.id, {
            include: [
                {
                model: Comments,
                include: [
                    {
                        model: User
                    }
                ]
            }
        ]
        });
        const singlePost = message.get({ plain: true });
        console.log(singlePost)
            res.render('singleposts', { singlePost });
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
    }
});
//add a comment to a single post
router.post('/:id', async (req, res) => {
    try {
        const message = await Comments.create({
            ...req.body,
            post_id: req.params.id,
            user_id: req.session.user_id
        });
        res.json({message})
    } catch (err) {
        res.status(500).json(err);
    }
})



  module.exports = router;