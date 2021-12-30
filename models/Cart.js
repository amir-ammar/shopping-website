var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CartSchema = new Schema({
    productID:{type: Number, required: true},
	userID: { type: Schema.Types.ObjectId, ref: 'User'},
	product: {type: String},
});





module.exports = mongoose.model('Cart', CartSchema);

