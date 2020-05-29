const indexRouter = require("express").Router();

// Main Routing File with all routes
indexRouter.use("/products", require("./product"));
indexRouter.use("/users", require("./user"));
indexRouter.use("/cart", require("./cart"));
indexRouter.use("/orders", require("./order"));
indexRouter.use("/auth", require("./passportAuth"));

module.exports = indexRouter;