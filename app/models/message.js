module.exports =  (sequelize, DataTypes)=> {

    let message = sequelize.define('message', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {

        },
    });


    return message;
};
