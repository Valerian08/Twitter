
module.exports = (sequelize,Datatypes) => {
    const Posts = sequelize.define('posts',{
        user_id: {type: Datatypes.INTEGER, references: { model:  { tableName: 'users'}, key: 'user_id'}},
        post_id: {type: Datatypes.INTEGER,primaryKey:true,autoIncrement: true},
        //userId: {type: Datatypes.INTEGER, foreignKey: true, references: Users, referencesKey : 'userId'},
        post: Datatypes.STRING(1000),
    });
    //Posts.belongsTo(models.Users,{foreignKey: 'userId',});
    return Posts;
}