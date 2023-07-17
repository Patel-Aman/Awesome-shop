const process = require('process');
const jwt = require('jsonwebtoken');

const APP_SECRET = process.env.APP_SECRET;

module.exports = {
	sign(data) {
		data = Object.assign(data);
		return (jwt.sign(data, APP_SECRET, {algorithm: 'HS256'}))
	},
	decode(token) {
		return jwt.verify(token, APP_SECRET, {algorithms: 'HS256'})
	}
}