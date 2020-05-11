const express = require('express');
const router = express.Router();
const {ensureAuthenticate} = require('../config/auth');

router.get('/', (req, res) => {
	res.render('welcome');
});

router.get('/dashboard', ensureAuthenticate ,(req, res) => {
	res.render('dashboard');
})

module.exports = router;