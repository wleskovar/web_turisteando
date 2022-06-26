module.exports = (sequelize, dataTypes) => {

    let alias = "Producto";
    let cols = {

        package_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },

       package_name: {
        type: dataTypes.STRING(100),
        allowNull: false
       },

       package_image: {
        type: dataTypes.STRING(150),
        allowNull: true
       },

       package_alt_image: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       package_price: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },

       package_title: {
        type: dataTypes.STRING(150),
        allowNull: false,
       },

       package_q_days: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       package_hotel: {
        type: dataTypes.INTEGER,
        allowNull: false,    
       },

       package_description: {
        type: dataTypes.STRING(500),
        allowNull: false,
       }, 

       package_date_admission: {
        type: dataTypes.DATE,
        allowNull: true,
       }, 

       package_index: {
        type: dataTypes.INTEGER,
        allowNull: false,
       }, 
       
       package_category: {
        type: dataTypes.INTEGER,
        allowNull: false,
       }, 
       
       package_excursions_id: {
        type: dataTypes.INTEGER,
        allowNull: true,
       }, 
       
       package_discount: {
        type: dataTypes.DECIMAL(5, 2),
        allowNull: false,
       }, 
       
       package_transportation: {
        type: dataTypes.INTEGER,
        allowNull: false,
       } 
  
    };
    let config = {
        tableName: "productos",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.belongsTo(models.Hotel, {
            as: "hotel",
            foreignKey: "package_hotel"
        });
        
        Producto.belongsTo(models.Tour, {
            as: "tour",
            foreignKey: "package_excursions_id"
        });
    }

    return Producto; 

}