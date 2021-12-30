Cart = require('../models/Cart');
var User = require('../models/User');
var Product = require('../models/Product');
var fs = require('fs');
const bcrypt = require('bcryptjs');
const { redirect } = require('statuses');
const flash = require('connect-flash');



exports.login = function(req, res) {
    res.render('login', {login: req.flash('login')});
};

exports.logout = (req, res)=> {
    req.session.destroy(function(err) {
        if (err) {
            throw err;
        } else {
            console.log('user logged out');
            res.redirect('/login');
        }
    });
};



exports.registration = function(req, res) {
    res.render('registration', {register: req.flash('register')});
};


exports.submitLogin = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    
    if (!user) {
        req.flash('login', 'email or password is incorrect');
        res.redirect('/login');
    }else{
        req.session.userID = user._id;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('login', 'email or password is incorrect');
            res.redirect('/login');
        }
        req.session.isAuth = true;
        res.redirect('/home');
    }
};



exports.home = function(req, res) {
    
    if(req.session.isAuth) {
        res.render('home');
    } else {
        res.redirect('/login');
    }
};


exports.register = async(req, res) => {
    const {username, email,password} = req.body;
    let user = await User.findOne({email: email});
 
        if (user) {
            req.flash('register', 'email already exists');
            res.redirect('/registration');
        }else{
            const hashedPsw = await bcrypt.hash(password, 12);
            let newuser = new User({
                username: username,
                email: email,
                password: hashedPsw
            });
            await newuser.save();
            res.redirect('/login');
        }
    
};


exports.viewSports = function(req, res) {
    if(req.session.isAuth) {
        res.render('sports');
    }
    else {
        res.redirect('/login');
    }
};

exports.viewPhones = function(req, res) {
    if(req.session.isAuth) {
        res.render('phones');
    }
    else {
        res.redirect('/login');
    }
};

exports.viewBooks = function(req, res) {
    if(req.session.isAuth) {
        res.render('books');
    }
    else {
        res.redirect('/login');
    }
};


exports.viewIphone = function(req, res) {
    if (req.session.isAuth) {
        res.render('iphone', {foundIphone: req.flash('foundIphone'), addedIphone: req.flash('addedIphone')});
    }
    else {
        res.redirect('/login');
    }
};

exports.viewGalaxy = function(req, res) {
    if(req.session.isAuth) {
        res.render('galaxy', {addedGalaxy: req.flash('addedGalaxy'), foundGalaxy: req.flash('foundGalaxy')});
    }
    else {
        res.redirect('/login');
    }
}

exports.viewSun = function(req, res) {
    if (req.session.isAuth) {
        res.render('sun', {foundSun: req.flash('foundSun'), addedSun: req.flash('addedSun')});
    }
    else {
        res.redirect('/login');
    }
}

exports.viewLeaves = function(req, res) {
    if (req.session.isAuth) {
        res.render('leaves', {foundLeaves: req.flash('foundLeaves'), addedLeaves: req.flash('addedLeaves')});
    }
    else {
        res.redirect('/login');
    }
}

exports.viewBoxing = function(req, res) {
    if (req.session.isAuth) {
        res.render('boxing', {foundBoxing: req.flash('foundBoxing'), addedBoxing: req.flash('addedBoxing')});
    }
    else {
        res.redirect('/login');
    }
}

exports.viewTennis = function(req, res) {
    if (req.session.isAuth) {
        res.render('tennis', {foundTennis: req.flash('foundTennis'), addedTennis: req.flash('addedTennis')});
    }
    else {
        res.redirect('/login');
    }
}

exports.addGalaxy = function(req, res) {
    if (req.session.isAuth) {
        Cart.findOne({productID: 2, userID: req.session.userID}, function(err, cart) {
            if (err) {
                throw err;
            }
            if (cart) {
                req.flash('foundGalaxy', 'you have already added this product');
                res.redirect('/viewGalaxy');
            } else {
                let newCart = new Cart({
                    productID: 2,
                    userID: req.session.userID,
                    product: 'galaxy'
                });
                newCart.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    req.flash('addedGalaxy', 'product added to cart');
                    res.redirect('/viewGalaxy');
                });
            }
        });
    }
    else {
        res.redirect('/login');
    }
}


exports.addIphone = function(req, res) {
    if (req.session.isAuth){
        Cart.findOne({productID: 1, userID: req.session.userID}, function(err, cart) {
            if (err) {
                throw err;
            }
            if (cart) {
                console.log('cart already exists');
                req.flash('foundIphone', 'you have already added this product');
                res.redirect('/viewIphone');
            } else {
                let newCart = new Cart({
                    productID: 1,
                    userID: req.session.userID,
                    product: 'iphone'
                });
                newCart.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    req.flash('addedIphone', 'product added to cart');
                    res.redirect('/viewIphone');
                });
            }
        });
    }
    else {
        res.redirect('/login');
    }
};

exports.addLeaves = function(req, res) {
    if (req.session.isAuth){

        Cart.findOne({productID: 3, userID: req.session.userID}, function(err, cart) {
            if (err) {
                throw err;
            }
            if (cart) {
                req.flash('foundLeaves', 'you have already added this product');
                res.redirect('/viewLeaves');
            } else {
                let newCart = new Cart({
                    productID: 3,
                    userID: req.session.userID,
                    product: 'leaves'
                });
                newCart.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    req.flash('addedLeaves', 'product added to cart');
                    res.redirect('/viewLeaves');
                });
            }
        });
    }
    else {
        res.redirect('/login');
    }
};


exports.addSun = function(req, res) {
    if (req.session.isAuth){
        Cart.findOne({productID: 4, userID: req.session.userID}, function(err, cart) {
            if (err) {
                throw err;
            }
            if (cart) {
                req.flash('foundSun', 'you have already added this product');
                res.redirect('/viewSun');
            } else {
                let newCart = new Cart({
                    productID: 4,
                    userID: req.session.userID,
                    product: 'sun'
                });
                newCart.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    req.flash('addedSun', 'product added to cart');
                    res.redirect('/viewSun');
                });
            }
        });
    }
    else {
        res.redirect('/login');
    }
};


exports.addTennis = function(req, res) {
    if (req.session.isAuth){
        Cart.findOne({productID: 5, userID: req.session.userID}, function(err, cart) {
            if (err) {
                throw err;
            }
            if (cart) {
                req.flash('foundTennis', 'you have already added this product');
                res.redirect('/viewTennis');
            } else {
                let newCart = new Cart({
                    productID: 5,
                    userID: req.session.userID,
                    product: 'tennis'
                });
                newCart.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    req.flash('addedTennis', 'product added to cart');
                    res.redirect('/viewTennis');

                });
            }
        });
    }
    else {
        res.redirect('/login');
    }
};

exports.addBoxing = function(req, res) {
    if (req.session.isAuth){
        Cart.findOne({productID: 6, userID: req.session.userID}, function(err, cart) {
            if (err) {
                throw err;
            }
            if (cart) {
                req.flash('foundBoxing', 'you have already added this product');
                res.redirect('/viewBoxing');
            } else {
                let newCart = new Cart({
                    productID: 6,
                    userID: req.session.userID,
                    product: 'boxing'
                });
                newCart.save(function(err) {
                    if (err) {
                        throw err;

                    }
                    req.flash('addedBoxing', 'product added to cart');
                    res.redirect('/viewBoxing');
                });
            }
        });
    }
    else {
        res.redirect('/login');
    }
};



exports.viewCart = function(req, res) {
    if (req.session.isAuth){
        
        Cart.find({userID: req.session.userID}, function(err, cart) {
            if (err) {
                console.log(err);
            } else {
                if (cart) {
                    res.render('cart', {cart: cart});
                } else {
                    res.render('cart', {cart: "Cart is Empty"});
                }
            }
        });
    }
    else {
        res.redirect('/login');
    }

};


// search function using regex
exports.search = function(req, res) {
    if (req.session.isAuth){
        var parsedUser = req.session.userID;
        
        var search = req.body.Search;
        var search = search.toLowerCase();
        Product.find({productname: new RegExp(search, "i")}, function(err, product) {
            
            if (err) {
                console.log(err);
            } else {

                if (product) {
                    res.render('searchresults', {products:product});
                } else {
                    res.render('searchresults');
                }
            }
        });
    }
    else {
        res.redirect('/login');
    }
};


