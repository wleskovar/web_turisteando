const access_database= require('../model/access_database.js');
const { browse_table, write_json } = require('../model/engine.js');
const engine= require('../model/engine.js'); // con este modulo operamos la base de datos

/* write_json: function (name_table, file_string){
        let file_json= JSON.stringify(file_string);
        let id = 0
        if (file_json.length>0){
        id=file_json.length + 1;
        }
        fs.writeFileSync(`${path_relative + name_table}.json`,file_json, 
                        err => (err)? console.log('ERROR al grabar archivo JSON'): '');
    },
 */



const cart_controller = {
    show_cart :  (req, res) => {
        let data_show_cart= engine.browse_table("cart");

        
       res.status(200).render('../views/productCart', {data_show_cart:data_show_cart});
        
    },
      
    add_item :   (req, res) => {
       
        const list_package = engine.browse_table("productos");
        let data_add_cart =req.params.id
        let data_show_cart = list_package.filter(elemento=>elemento.package_id == data_add_cart)
        let cart_history = engine.add_columm("cart",data_show_cart[0]);
        data_show_cart= engine.browse_table("cart");
        res.status(200).render('../views/productCart', { data_show_cart: data_show_cart });
    },


    delete_item : (req, res) => {
        let data_delete_cart = req.params.id;
        engine.delete_columm("cart", data_delete_cart)        
        res.redirect("/cart")          
            },
    
    purchase : (req, res) => {
        res.send("Comprar");
            },

    purchase_detail: (req, res) => {
        res.send("Ver detalle de Compra");
            },
            
    cart_form :  (req, res) => {
                res.render("../views/cartForm");
                    },
    cart_final :  (req, res) => {
                    res.render("../views/cartFinal");
                            },
    
};
module.exports= cart_controller;