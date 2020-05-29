const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
		   if (value.toLowerCase().includes('password')) {
		       throw new Error('Password cannot contain "password"')
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
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}] // Use this when using JWT
});

usersSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
}

// Create Auth token for the users 
usersSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);

	user.tokens.push({token});
	await user.save();

	return token;
}

// Verify and login the user based on the Token
usersSchema.statics.loginByCredentials = async (email, password) => {
	const user = await User.findOne({email});
	if(!user){
		throw new Error("Login Failed");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if(!isMatch){
		throw new Error("Login Failed");
	}
	return user;
} 

// Encrypt/Hash the password and save
usersSchema.pre('save', async function (next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', usersSchema);

module.exports = User;

