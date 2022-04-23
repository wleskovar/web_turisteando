const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/packages', (req, res) => {
    res.sendFile(path.join(__dirname, './views/packages.html'));
});

app.get('/deals', (req, res) => {
    res.sendFile(path.join(__dirname, './views/deals.html'));
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productDetail.html'));
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productCart.html'));
});

app.get('/cartForm', (req, res) => {
    res.sendFile(path.join(__dirname, './views/cartForm.html'));
});

app.get('/cartFinal', (req, res) => {
    res.sendFile(path.join(__dirname, './views/cartFinal.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, './views/contacto.html'));
});

app.listen(process.env.PORT || 5020, () => {
    console.log('Servidor corriendo en el puerto 5020');
});