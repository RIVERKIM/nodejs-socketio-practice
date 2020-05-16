const User = require('../../../models/user');

exports.list = (req, res) => {  // GET api/user/list
	if(!req.decoded.admin) {
		return res.status(403).json({
			message: 'you are not an admin'
		})
	}
	
	User.find({}).then(
		users => {
			res.json({users});
		} 
	)
}

exports.assignAdmin = (req, res) => { // POST /api/user/assign-admin/:username
	if(!req.decoded.admin) {
		console.log(req.decoded);
		return res.status(403).json({
			message: "you are not an admin"
		})
	}
	
	User.findOneByUsername(req.params.username).then(
		user => user.assignAdmin
	).then(
		res.json({
			success: true
		})
	)
}