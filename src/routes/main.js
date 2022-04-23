const path = require('path');

const express= require('express');
const router= express.Router();

/* rutas */
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../views/index'));
});
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.get('/packages', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/packages.html'));
});

router.get('/deals', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/deals.html'));
});

router.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productDetail.html'));
});

router.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productCart.html'));
});

router.get('/cartForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cartForm.html'));
});

router.get('/cartFinal', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cartFinal.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contacto.html'));
});

module.exports= router;