var express = require('express');
var router = express.Router();
var Control = require('../Controller/Control');


// login page (main page)
router.get('/', Control.login);
router.get('/login', Control.login);

// logout
router.post('/logout', Control.logout);


// registration page
router.get('/registration', Control.registration);

// submit login
router.post('/submitLogin', Control.submitLogin);

// submit registration
router.post('/register', Control.register);


// get home page
router.get('/home',Control.home);


// view sports
router.get('/viewSports', Control.viewSports);

//view phones
router.get('/viewPhones', Control.viewPhones);


// view books
router.get('/viewBooks', Control.viewBooks);

// view iphone
router.get('/viewIphone', Control.viewIphone);

// view galaxy
router.get('/viewGalaxy', Control.viewGalaxy);

// view sun
router.get('/viewSun', Control.viewSun);

// view leaves
router.get('/viewLeaves', Control.viewLeaves);

// view boxing
router.get('/viewBoxing', Control.viewBoxing);

// view tennis
router.get('/viewTennis', Control.viewTennis);

// add galaxys to cart
router.post('/addGalaxy', Control.addGalaxy);

// add Iphone to cart
router.post('/addIphone', Control.addIphone);

// add leaves to cart
router.post('/addLeaves', Control.addLeaves);

// add sun to cart
router.post('/addSun', Control.addSun);

// add tennis to cart
router.post('/addTennis', Control.addTennis);

// add boxing to cart
router.post('/addBoxing', Control.addBoxing);

// view cart
router.get('/viewCart', Control.viewCart);

// search bar
router.post('/search', Control.search);

module.exports = router;
