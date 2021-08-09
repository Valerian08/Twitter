const Sequelize = require('sequelize');
const DB_HOSTNAME = '127.0.0.1'
const DB_USERNAME = 'root'
const DB_PASSWORD = 'Admin123'
const DB_NAME = 'Twitter'

const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    host:DB_HOSTNAME,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

sequelize.authenticate().then(() =>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log('Error in connecting Database',err);
})

module.exports = sequelize;