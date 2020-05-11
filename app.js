const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true}).then(() => {
	console.log("MongoDB Connected...");
}).catch(err => {
	console.log(err);
})

app.use(express.static(path.join(__dirname, 'static')));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Express Session
app.use(session({
	secret: "keyboard cat",
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
})

const PORT = process.env.PORT || 3000;

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


app.listen(PORT, console.log(`Server started on port ${PORT}`));