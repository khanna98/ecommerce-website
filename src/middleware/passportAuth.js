const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require("../models/");

// Serialize and Deserialize the User Data
passport.serializeUser(async (user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.User.findById(id);
		done(null, user);
	} catch(e) {
		console.log(e);
	}
});

// Authenticate users using the Google Strategy
passport.use(new GoogleStrategy({
		// Pass your ID and Secret as options here
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/api/auth/google/callback"
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
            
            // Check if the user exists or not
			const user = await db.User.findOne({googleId: profile.id});
			if(user){
				done(null, user)
			} else {
				// Create New User
				const newUser = new db.User({
					name: profile._json.name,
					email: profile._json.email,
					googleId: profile.id
				})
				await newUser.save();
				console.log(newUser)
				done(null, newUser);
			}
		} catch(e) {
			// Logging the error
			console.log('An Error occurred: ', e);
		}
	}
));