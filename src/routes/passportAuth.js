const express = require("express");
const router = express.Router();
const passport = require("passport");

// Google Auth to get profile info and Email of User
router.get("/google", passport.authenticate('google', {
	scope: ['profile','email']
}));

// After authenticating, redirect the user
router.get("/google/redirect", passport.authenticate('google'), (req, res) => {
	res.status(200).send(req.user);
})

module.exports = router
