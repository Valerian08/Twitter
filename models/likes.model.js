
module.exports = (sequelize,Datatypes) => {
    const Likes = sequelize.define('likes',{
        user_id: {type: Datatypes.INTEGER, references: { model: { tableName: 'users'}, key: 'user_id'}},
        post_id: {type: Datatypes.INTEGER, references: { model: { tableName: 'posts'}, key: 'post_id'}},
        like_id: {type: Datatypes.INTEGER,primaryKey:true,autoIncrement: true},
    });
    return Likes;
}