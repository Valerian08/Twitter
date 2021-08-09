const { validateRegister, validatePost } = require('./../util');
const db = require('./../config/index');
const Users = db.users;
const Posts = db.posts;
const Likes = db.likes;
const Follows = db.follows;

exports.getUser = (req, res ) =>{
    Users.findAll()
    .then(data =>{
         res.send(data);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

exports.getOneUser = (req, res ) =>{
    Users.findAll({
        where:{
            user_id: req.params.user_id
        }
    })
    .then(data =>{
        if(data.length == 0) {
            res.sendStatus(204);
        }
        else{
            res.send(data);
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

exports.putUser = (req, res ) =>{
    const newdata = {
        email: req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    };
    Users.update(newdata,{
        where: {
            user_id: req.params.user_id
        }
    })
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

exports.deleteUser = (req, res ) =>{
    const newdata ={
        user_id: req.params.user_id
    };
    Users.findAll({
        where:{
            user_id: newdata.user_id
        }
    })
    .then(data =>{
        if(data.length == 0) {
            res.send('User does not exist');
        }
        else{
            res.send(data);
            Users.destroy({
                where:{
                    user_id: newdata.user_id
                }
            })     
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

exports.postUser = (req, res)=> {
    const { error } = validateRegister(req.body);
    if(error){
        res.status(400).send(error.details[0].message);         
        return;
    }
    else{
        Users.findAll({
            where:{
                email: req.body.email
            }
        })
        .then(user => {
            if(user.length != 0 ) {
              res.send('Email already exists, please choose another one.');
            } else {
                const newUser = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password
                };
                Users.create(newUser)
                .then(function (users){
                    if(users){
                        res.send(users);
                    }
                    else{
                        res.status(400).send('Error in inserting new record');
                    }
                });
            }
        });
    }
}


exports.createPost = (req, res)=> {
    const { error } = validatePost(req.body);
    if(error){
        res.status(400).send(error.details[0].message);         
        return;
    }
    else{
        const user_id = req.params.user_id;
        Users.findByPk(user_id)
        .then(user => {
            if(!user) {
              res.send('User does not exist.');
            } else {
                const newPost = {
                    user_id: req.params.user_id,
                    post: req.body.post
                };
                Posts.create(newPost)
                .then(function (posts){
                    if(posts){
                        res.send(posts);
                    }
                    else{
                        res.status(400).send('Error in posting',err);
                    }
                });
            }
        });
    }
}

exports.showPost = (req, res)=> {
    Posts.findAll({
        where:{
            user_id: req.params.user_id
        }
    })
    .then(data =>{
        if(data.length == 0) {
            res.send('No post to show/User does not exist');
        }
        else{
            res.send(data);
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

exports.deletePost = (req, res)=> {
    Posts.findAll({
        where:{
            user_id: req.params.user_id,
            post_id: req.params.post_id
        }
    })
    .then(data =>{
        if(data.length == 0) {
            res.send('User/Post does not exist');
        }
        else{
            res.send(data);
            Posts.destroy({
                where:{
                    post_id: req.params.post_id
                }
            })     
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

exports.createLike = (req, res)=> {
    Posts.findAll({
        where:{
            user_id: req.params.user_id,
            post_id: req.params.post_id
        }
    })
    .then(data =>{
        if(data.length == 0) {
            res.send('User/Post does not exist');
        }
        else{
            const newLike = {
                user_id: req.params.user_id,
                post_id: req.params.post_id
            };
            Likes.create(newLike)
            .then(function (likes){
                if(likes){
                    res.send(likes);
                }
                else{
                    res.status(400).send('Error in posting like',err);
                }
            });
        }
    })
}

exports.createFollow = (req, res)=> {
            Users.findAll({
                where:{
                    user_id: req.params.user_id
                }
            })
            .then(user => {
                Users.findAll({
                    where:{
                        user_id: req.body.following_id
                    }
                })
                if(user.length == 0) {
                res.send('User does not exist.');
                } else {
                    const newFollow = {
                        follower_id: req.params.user_id,
                        following_id: req.body.following_id
                    };
                    Follows.create(newFollow)
                    .then(function (follows){
                        if(follows){
                            res.send(follows);
                        }
                        else{
                            res.status(400).send('Error in following',err);
                        }
                    });
                }
            });
}

exports.showFollow = (req, res)=> {
    Users.findAll({
        where:{
            user_id: req.params.user_id
        }
    })
    .then(data =>{
        if(data.length == 0) {
            res.send('User does not exist');
        }
        else{
            Follows.findAll({
                 where: {
                     follower_id: req.params.user_id
                 },
                        attributes: [
                            //[sequelize.fn('COUNT', sequelize.col('follower_id')), 'follower'],
                            [sequelize.fn('COUNT', sequelize.col('following_id')), 'following']
                        ],   
            })
            .then(foll =>{
                res.send(foll); 
            })  
        }
    })
    .catch(err =>{
        // console.log(err);
        res.status(500).send(err);
    })
}

exports.showLike = (req, res)=> {
    Likes.findAll({
        where:{
            user_id: req.params.user_id,
            post_id: req.params.post_id
        }
    })
    .then(data =>{
        if(data.length == 0) {
            res.send('User/Post does not exist');
        }
        else{
            Likes.findAll({
            // where: {
            //     user_id: req.params.user_id,
            //     post_id: req.params.post_id
                    attributes: {
                    include: [
                        [sequelize.fn('COUNT', sequelize.col('like_id')), 'likes']
                    ]
                    }
                //}
              })
              .then(lik =>{
                res.send(lik); 
            })  
        }
    })
    .catch(err =>{
        // console.log(err);
        // res.status(500).send(err);
        res.status(400).send('Error in fetching like',err);
    })
}