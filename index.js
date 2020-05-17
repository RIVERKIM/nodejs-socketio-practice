const mongoose = require('mongoose');

// Map global promise - get rid or warning
mongoose.Promise = global.Promise;

// Connet to db 
 mongoose.connect('mongodb://localhost:27017/customercli', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(console.log("mongoDB connected........")).catch(err => {console.log(err)});
const db = mongoose.connection;

// Import model

const Customer = require('./models/customer');

// Add Customer
const addCustomer = (customer) => {
	Customer.create(customer).then(customer => {
		console.info('New Customer Added');
		db.close();
	}).catch(err => console.log(err));
}

// Update Customer
const updateCustomer = (_id, customer) => {
	Customer.update({_id}, customer)
	.then(customer => {
		console.info('Customer Updated');
		db.close();
	})
}


// Remove Customer
const removeCustomer = (_id) => {
	Customer.remove({_id})
	.then(customer => {
		console.info('Customer Updated');
		db.close();
	})
}

const listCustomers = () => {
	Customer.find({})
	.then(customers => {
		console.info(customers);
		console.info(`${customers.length} customers`);
		db.close();
	})
} 

// Find Customer
const findCustomer = (name) => {
	// Make case insensitive
	const search = new RegExp(name, 'i');
	Customer.find({$or: [{firstname: search}, {lastname: search}]})
	.then(customer => {
		console.info(customer);
		console.info(`${customer.length} matches`);
		db.close();
	}).catch(err => console.log(err));
}

// Export All Methods
module.exports = {
	addCustomer,
	findCustomer,
	updateCustomer,
	removeCustomer,
	listCustomers
}