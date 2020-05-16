const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Load the config
const config = require('./config/config.js');
const PORT = process.env.PORT || 3000;

// Express Configuration
const app = express();

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Print the request log on people
app.use(morgan('dev'));

// Set the secret key variable for jwt
app.set('jwt-secret', config.secret);

// Index page, just for testing
app.get('/', (req, res) => {
	res.send('Hello JWT');
})

// Configure api router
app.use('/api', require('./routes/api'));

// Open the server
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}....`);
});


// Connect to mongoDB Server
mongoose.connect(config.mongoDBUri, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
	console.log('Connected to mongoDB server....');
}).catch(err => {
	console.log(err);
})
