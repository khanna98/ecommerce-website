const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

// require authentication for all routes
router.all("*", auth)

// CRUD operations for Customer Shopping Cart
router
	.get("/", cartController.getProductsInCart)
	.post("/add", cartController.addToCart)
	.put("/update", cartController.updateCart)
	.put("/remove", cartController.removeFromCart)

module.exports = router;