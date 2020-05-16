const User = require('../../../models/user')
const jwt = require('jsonwebtoken');

// Register
exports.register = (req, res) => {
	const {username, password} = req.body;
	let newUser = null;
	
	// create a new user if does not exist
	const create = (user) => {
		if(user) {
			throw new Error('username exists');
		} else {
			return User.create(username, password);
		}
	}
	
	// count the number of the user
	const count = (user) => {
		newUser = user;
		return User.count({}).exec();
	}
	
	const assign = (count) => {
		if(count === 1) {
			return newUser.assignAdmin();
		} else {
			return Promise.resolve(false);
		}
	}
	
	const respond = (isAdmin) => {
		res.json({
			message: "registered successfully",
			admin: isAdmin ? true : false
		})
	}
	
	const onError = (error) => {
		res.status(409).json({
			message: error.message,
		});
	}
	
	// check username duplication
	User.findOneByUsername(username).then(create).then(count).then(assign).then(respond).catch(onError);
}


// Login

exports.login = (req, res) => {
	const {username, password} = req.body;
	const secret = req.app.get('jwt-secret');
	
	// check the user info & generate the jwt
	// check the user info generate the jwt
	
	const check = (user) => {
		if(!user) {
			throw new Error('login failed');
		} else {
			if(user.verify(password)) {
				const p = new Promise((resolve, reject) => {
					jwt.sign({
						_id: user._id,
						username: user.username,
						admin: user.admin
					}, secret, {
						expiresIn: '7d',
						issuer: "velopert.com",
						subject: 'userInfo',
					}, (err, token) => {
						if(err) reject(err);
						resolve(token);
					}
					)
				})
				return p;
			} else {
				throw new Error('login failed');
			}
		}
	}
	
	// respond the token
	const respond = (token) => {
		res.json({
			message: "logged in successfully",
			token
		})
	}
	
	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		})
	}
	
	// find the userInfo
	User.findOneByUsername(username).then(check).then(respond).then(onError);
}


/*
	GET /api/auth/check
*/

exports.check = (req, res) => {
	res.json({
		success: true,
		info: req.decoded
	})
}

