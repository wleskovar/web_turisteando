/* Este controlador "contact_controller" implementa todos los metodos para
manejar los productos */

const contact_controller = {
    contact: (req, res) => {
        res.status(200).render('../views/contact');
    }
};

module.exports = contact_controller;