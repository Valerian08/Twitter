const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 1550;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/',routes);

app.listen(PORT, function(){
    console.log('Listening on port',PORT);
});

// { 
//     "lastname":"rahul",
//     "firstname":"Rahul",
//     "email":"rahul@gmail.com",
//     "password":"rahul"
// }

// { 
//     "post":"From user 2"
        //"following_id":"3"
// }