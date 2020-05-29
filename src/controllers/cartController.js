const db = require("../models/");
const mongoose = require('mongoose')

// Fetching products in the cart
exports.getProductsInCart = async (req, res) => {
	try {
		// Get product details in the cart
		await req.user.populate({
			path: "cart.productId",
			select: ["imgUrl", "name", "price"]	
		}).execPopulate();

		const userObject = req.user.toObject();

		const cart = userObject.cart.map((i) => {
			return {
				...i.productId,
				quantity: i.quantity
			}
		})

		res.status(200).send(cart);
	} catch(e) {
		res.status(500).send({message: e.message})
	}
}

// Add item to cart
exports.addToCart = async (req, res) => {
	try {
		req.user.cart.push(req.body);
		await req.user.save();
		
		// Find recently added items in the Cart 
		const cartItem = req.user.cart.find((item) => {
			return (item.productId == req.body.productId && item.quantity === req.body.quantity)
		})

		if(cartItem)
			res.status(201).send(cartItem);
		else
			res.status(500).send({message: "cannot add product to cart"});

	} catch(e) {
		res.status(500).send({message: e.message})
	}
}

// Update quantity in cart
exports.updateCart = async (req, res) => {
	try {
		const userObject = req.user.toObject();
		const cart = userObject.cart.map((item) => (
			(item.productId == req.body.productId) ? {...item, quantity: req.body.quantity} : item
		))
		req.user.cart = cart;
		await req.user.save();
		res.status(200).send();
	} catch(e) {
		res.status(500).send({message: e.message});
	}
}

// Remove items from cart
exports.removeFromCart = async (req, res) => {
	try {
		const cart = req.user.cart.filter((item) => {
			return item.productId != req.body.productId;
		})
		req.user.cart = cart;
		await req.user.save();
		res.status(200).send();
	} catch(e) {
		res.status(500).send({message: e.message});
	}	
}