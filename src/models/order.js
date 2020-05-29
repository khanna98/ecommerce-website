const mongoose = require("mongoose");
const validator = require('validator');

// Define the Orders Schema
const ordersSchema = new mongoose.Schema({
	dateOfDelivery: {
		type: Date,
		required: true,
		default: new Date()  
	},
	status: {
		type: String,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	products: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			},
			quantity: Number,
		}
	],
	price: {
		type: Number,
		required: true,
		validate(val) {
			if(val <= 0) {
				throw new Error('Total bill cannot be negative.');
			}
		}	
	},
	addressOfDelivery: {
		street: String,
		city: String,
		pincode: String,
		country: String
	},
	nameOfRecipient: {
		type: String,
		required: true
	}
})

// Create a new Order Model
const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;