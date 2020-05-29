const express = require("express");
const passport = require("passport")
const apiRoutes = require("./routes");
const passportAuth = require("./middleware/passportAuth") 

const app = express();
const port = process.env.PORT

// Initialize the Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use("/api", apiRoutes);

app.listen(port, () => {
	console.log(`API Server is running on port ${port}`);
})