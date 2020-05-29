const mongoose = require("mongoose");
const validator = require('validator');

// Define the Product schema
const productsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: String,
	imgUrl: String,
	price: {
		type: Number,
		required: true,
		validate(val) {
			if(val <= 0) {
				throw new Error('Product price cannot be negative.');
			}
		}
	},
	available: {
		type: Boolean,
		required: true
	},
	category: [
		{
			name: String
		}
	],
	quantityAvailable: {
		type: Number,
		required: true,
		validate(val) {
			if(val <= 0) {
				throw new Error('Available Quantity cannot be negative.');
			}
		}
	}
}) 

// Create a new Product Model
const Product = mongoose.model('Product', productsSchema);

module.exports = Product;