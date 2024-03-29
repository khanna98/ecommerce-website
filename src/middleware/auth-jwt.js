const jwt = require('jsonwebtoken');
const db = require('../models');

// Authentication using JWT
const auth = async(req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await db.User.findOne({_id: decoded._id, 'tokens.token': token});

		if(!user){
			throw new Error();
		}

		req.token = token;
		req.user = user;
		next();
	} catch(e) {
		res.status(401).send({error: "AuthenticatION Required !"});
	}
}

module.exports = auth;