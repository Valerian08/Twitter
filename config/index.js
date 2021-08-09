const Sequelize = require('sequelize');
const Datatypes = require('sequelize/lib/data-types');
const sequelize = require('./db');
const userModels = require('./../models/users.model');
const postModels = require('./../models/posts.model');
const likeModels = require('./../models/likes.model');
const followModels = require('./../models/follows.model');

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = userModels(sequelize,Datatypes);
db.posts = postModels(sequelize,Datatypes);
db.likes = likeModels(sequelize,Datatypes);
db.follows = followModels(sequelize,Datatypes);

db.sequelize.sync({force:true})
.then(() => {
    console.log("sync successful");
})
.catch((err) =>{
    console.log("sync error:",err);
})

module.exports = db;

