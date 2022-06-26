module.exports = (sequelize, dataTypes) => {

    let alias = "User";
    let cols = {

       user_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },

       user: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       email: {
        type: dataTypes.STRING(150),
        allowNull: false,
       },

       password: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       password_valid: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       first_name: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       last_name: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       birth_date: {
        type: dataTypes.DATE,
        allowNull: false,
       },

       age: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       identity_document: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       home: {
        type: dataTypes.STRING(150),
        allowNull: false,
       },

       postal_code: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       province_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       email_alternative: {
        type: dataTypes.STRING(150),
        allowNull: false,
       },

       phone_number: {
        type: dataTypes.STRING(150),
        allowNull: false,
       },
    }

    let config = {
        tableName: "users",
        timestamps: false
        }

    const User = sequelize.define(alias, cols, config);
            
    User.associate = function(models){
        User.belongsTo(models.Province, {
                as: "province",
                foreignKey: "province_id"
        });
        
        
        }
    
    return User; 

}