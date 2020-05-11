const {check, validationResult} = require('express-validator');

const validationRules = () => {
	return [
		check('name').exists().withMessage("Name must be required"),
		check('email').isEmail().withMessage('Email must be required'),
		check('password').exists().withMessage('Password must be required'),
		check('password2', 'passwordConfirmation must have the same value as the password field').exists().custom((value, {req}) => value === req.body.password),
	]
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	
	if(errors.isEmpty()) {
		return next();
	} else {
		return res.render('register', {
			errors: errors.array(),
		});
	}
}

module.exports = {validationRules, validate};