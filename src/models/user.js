const mongoose = require("mongoose");
const validator = require("validator");

// Define the User schema
const usersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
		   if (!validator.isEmail(value)) {
		       throw new Error('Email is invalid')
		   }
		}
	},
	addresses : [
		{
			street: String,
			city: String,
			pincode: String,
			country: String
		}
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order'
		}
	],
	cart: [
		{
			_id: false,
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			quantity: {
				type: Number,
				required: true
			}
		}
	],
	googleId: String,
});

// Convert the Data to JSON
usersSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();

	delete userObject.googleId;

	return userObject;
}

// Create a new User Model
const User = mongoose.model('User', usersSchema);

module.exports = User;

