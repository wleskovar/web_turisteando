module.exports = (sequelize, dataTypes) => {

    let alias = "Transaction";
    let cols = {

       transaction_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },

       user_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       sale_date: {
        type: dataTypes.DATE,
        allowNull: false,
       },

      total: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },

       payment_method_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       card_number: {
        type: dataTypes.STRING(50),
        allowNull: false,
       },

       expiration: {
        type: dataTypes.DATE,
        allowNull: false,
       },

       security_code: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
  
    }

    let config = {
        tableName: "transactions",
        timestamps: false
        }

    const Transaction = sequelize.define(alias, cols, config);
            
        Transaction.associate = function(models){
        Transaction.belongsTo(models.User, {
                as: "user",
                foreignKey: "user_id"
        });

        Transaction.hasMany(models.DetailTransaction, {
            as: "detailtransactions",
            foreignKey:"transaction_id"
        });
        Transaction.hasMany(models.PaymentMethod, {
            as: "paymentMethod",
            foreignKey:"payment_method_id"
        });

        }
    
    return Transaction; 

}