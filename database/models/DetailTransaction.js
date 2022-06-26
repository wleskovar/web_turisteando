module.exports = (sequelize, dataTypes) => {

    let alias = "DetailTransaction";
    let cols = {

       detailTransaction_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },

       transaction_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       package_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       package_price: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },

       package_discount: {
        type: dataTypes.DECIMAL(5,2),
        allowNull: false,
       },

       package_date_admission: {
        type: dataTypes.DATE,
        allowNull: false,
       },

       number_passengers: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
  
    }

    let config = {
        tableName: "detailtransactions",
        timestamps: false
        }

    const DetailTransaction = sequelize.define(alias, cols, config);
            
        DetailTransaction.associate = function(models){
            DetailTransaction.belongsTo(models.Transaction, {
                as: "transaction",
                foreignKey: "transaction_id"
        });
        
        DetailTransaction.hasMany(models.Producto, {
            as: "productos",
            foreignKey:"package_id"
        });

        }
    
    return DetailTransaction; 

}