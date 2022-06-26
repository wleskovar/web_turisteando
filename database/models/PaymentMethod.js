module.exports = (sequelize, dataTypes) => {

    let alias = "PaymentMethod";
    let cols = {

        paymentmethod_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },

      name: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },
    }

    let config = {
        tableName: "paymentmethod",
        timestamps: false
        }

    const PaymentMethod = sequelize.define(alias, cols, config);
            
    PaymentMethod.associate = function(models){
        PaymentMethod.belongsTo(models.Transaction, {
                as: "transaction",
                foreignKey: "payment_method_id"
        });
        
       
        }
    
    return PaymentMethod; 

}