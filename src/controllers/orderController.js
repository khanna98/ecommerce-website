const db = require("../models/");

// Create order
exports.createOrder = async (req, res) => {
	try {
		const order = new db.Order(req.body);

		// Save the new Order in db
		await order.save();
		
		// Store order reference in Users
		req.user.orders.push(order._id);

		// Save user
		await req.user.save();
		res.status(201).send(order);
	} catch(e) {
		res.status(500).send({message: e.message});
	}
}

// Fetch user orders
exports.getOrders = async (req, res) => {
	try {
		await req.user.populate('orders').execPopulate();
		res.status(200).send({orders: req.user.orders});
	} catch(e) {
		res.status(500).send({message: ""})
	}
}