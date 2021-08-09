
module.exports = (sequelize,Datatypes) => {
    const Follows = sequelize.define('follows',{
        follow_id: {type: Datatypes.INTEGER,primaryKey:true,autoIncrement: true},
        follower_id: {type: Datatypes.INTEGER, references: { model: { tableName: 'users'}, key: 'user_id'}},
        following_id: {type: Datatypes.INTEGER, references: { model: { tableName: 'users'}, key: 'user_id'}},
    });
    return Follows;
}