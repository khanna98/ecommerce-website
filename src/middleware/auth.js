// Basic Authentication for Users
const auth = (req, res, next) => {
	if(!req.user){
		res.status(401).send({message: "AuthenticatION Required !"})
	} else {
		next();
	} 
}

module.exports = auth;