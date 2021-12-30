var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productname: {type: String, required: true, unique: true},
});


module.exports = mongoose.model('Product', ProductSchema);