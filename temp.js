//Header
const header = {
	"type": "JWT",
	"algorithm": "HS256",
};

const encodedHeader = new Buffer(JSON.stringify(header)).toString('base64').replace(/=/gi, '');

// Payload 

const payload = {
	"iss": "velopert.com",
	"exp": "148527000000",
	"https://velopert.com/jwt_claims/is_admin": true,
	"userId": "1111111111",
	"username": "garam",
};

const encodedPayload = new Buffer(JSON.stringify(payload)).toString('base64').replace(/=/gi, '');

// Signature = HMACSHA256(encodedHeader + "." + encodedPayload, secret)
const crypto = require('crypto');
const signature = crypto.createHmac('sha256', 'secret').update(encodedHeader + '.' + encodedPayload).
digest('base64').replace(/=/gi, '');

// Result: encodedHeader.encodedPayload.signature

console.log(encodedHeader+ "." + encodedPayload + "." + signature);

