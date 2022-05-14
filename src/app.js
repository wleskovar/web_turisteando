const express = require('express');
const path = require('path');
const methodOverride= require('method-override')
const app = express();
const publicPath = path.join(__dirname, '../public');

/* rutas */
const rutasMain = require('./routes/main.js');
const rutasPackages = require('./routes/packages.js');
const rutasDeals = require('./routes/deals.js');
const rutasProducts = require('./routes/products.js');
const rutasCart = require('./routes/cart.js');
const rutasAdmin = require('./routes/admin.js');
const rutasLogin = require('./routes/login.js');
const rutasRegister = require('./routes/register.js');
const rutasContact = require('./routes/contact.js');

app.set('view engine', 'ejs');
/* seteo donde esta el directorio "views" */
app.set('views', __dirname + '/views');


app.use(express.static(publicPath));
/* configuracion para poder capturar la informacion de los formularios */
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

/* puntos de entrada */
app.use('/', rutasMain);
app.use('/index', rutasMain);
app.use('/login', rutasLogin);
app.use('/packages', rutasPackages);
app.use('/deals', rutasDeals);
app.use('/productDetail', rutasProducts);
app.use('/cart', rutasCart);
app.use('/admin', rutasAdmin);
app.use('/register', rutasRegister);
app.use('/contact', rutasContact);

/* Error 404 */
app.use((req, res, next) => {
    res.status(404).render('notFound');
});

/* se monta el servidor */
app.listen(process.env.PORT || 5020, () => {
    console.log('Servidor corriendo en el puerto 5020');
});

