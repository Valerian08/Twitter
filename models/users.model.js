module.exports = (sequelize,Datatypes) => {
    const Users = sequelize.define('users',{
        user_id: {type: Datatypes.INTEGER,primaryKey:true,autoIncrement: true},
        firstname: Datatypes.STRING,
        lastname: Datatypes.STRING,
        email: Datatypes.STRING,
        password: Datatypes.STRING,
    });
    return Users;
}
