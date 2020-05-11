const express = require('express')
const router = express.Router();
const {validationRules, validate} = require('../Validator/validator_user.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const passport = require('passport');


//User model
const User = require('../models/User');

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/register', (req, res) => {
	res.render('register');
});

// Register Handle
router.post('/register', validationRules(), validate, (req, res) => {
	const {name, email, password} = req.body;
	const query = {email: email};
	User.findOne(query).then(user => {
		if(user) {
			//if user exists
			const errors = "Email is already registered"
			res.render('register', {
				errors: errors,
			});
		} else {
			const newUser = new User({
				name: name,
				email: email,
				password: password,
			});
			
			//Hash Password
			bcrypt.genSalt(saltRounds, (err, salt) => {
				if(err) throw err;
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
					newUser.save().then(() => {
						req.flash('success_msg', 'You are now registered and can log in');
						res.redirect('/users/login');
					}).catch(err => console.log(err));
				})
			})
		}
	}).catch(err => console.log(err));
	
})

// Login handle

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true,
	})(req, res, next);
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', "You are logged out");
	res.redirect('/users/login');
});


module.exports = router;