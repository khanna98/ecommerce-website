const mongoose = require('mongoose')

// Connect Mongoose to the Backend
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology : true,
});

// Export all the created models
module.exports = {
	Product: require("./product"),
	User: require("./user"),
	Order: require("./order")
};
