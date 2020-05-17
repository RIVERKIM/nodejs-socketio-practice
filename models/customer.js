const mongoose = require('mongoose');

// Customer Schema
const customerSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	phone: {
		type: String
	},
	email: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model('Customer', customerSchema);