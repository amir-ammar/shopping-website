Cart = require('../models/Cart');
var User = require('../models/User');
var Product = require('../models/Product');
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
        User.findOne({_id: req.session.userID}, function(err, user) {
            if (err) {
                throw err;
            } else {
                res.render('home', {name: user.username});
            }
        });    
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

        if(password.length==0){
            req.flash('register', 'password is empty');
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


var escapeRegex = function(text) {
    return text.replace(/[-[\]{}()*+?!%@&.,\\^$|#\s]/g, "\\$&"); // to escape the matching characters
};

exports.search = function(req, res) {
    if (req.session.isAuth){
        var parsedUser = req.session.userID;
        
        var search = req.body.Search;        
        var regex = new RegExp(escapeRegex(search), 'gi');
        Product.find({productname: new RegExp(regex, "gi")}, function(err, product) {
            
            if (err) {
                console.log(err);
            } else {

                if (product) {
                    
                    
                    var products = [];
                    for (var i = 0; i < product.length; i++) {
                        if(product[i].productname === 'Galaxy S21 Ultra') {
                            products.push('galaxy');
                        }else if(product[i].productname === 'iPhone 13 Pro') {
                            products.push('iphone');
                        }
                        else if(product[i].productname === 'Leaves of Grass') {
                            products.push('leaves');
                        }
                        else if(product[i].productname === 'The Sun and Her Flowers') {
                            products.push('sun');
                        }
                        else if(product[i].productname === 'Tennis Racket') {
                            products.push('tennis');
                        }
                        else if(product[i].productname === 'Boxing Bag') {
                            products.push('boxing');
                        }

                    }
                    
                    res.render('searchresults', {products:products});
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



