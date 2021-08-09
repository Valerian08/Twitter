const { response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) =>{
    res.send("Hello User");
});

const { getUser, getOneUser, deleteUser, postUser, putUser } = require('./controllers/user.controller');
router.post('/register', postUser)
router.get('/users', getUser)
router.get('/users/:user_id', getOneUser)
router.put('/users/:user_id', putUser)
router.delete('/users/:user_id', deleteUser)

const { createPost, showPost, deletePost} = require('./controllers/user.controller');
router.post('/posts/:user_id', createPost)
router.get('/posts/:user_id', showPost)
router.delete('/posts/:user_id/:post_id', deletePost)

const { createLike, showLike } = require('./controllers/user.controller');
router.post('/likes/:user_id/:post_id', createLike)
router.get('/likes/:user_id/:post_id', showLike)

const { createFollow, showFollow } = require('./controllers/user.controller');
router.post('/follows/:user_id', createFollow)
router.get('/follows/:user_id', showFollow)

module.exports = router;


