const Route = require('express').Router();
const user = require('./connection/user');
const validator = require('./middleware/validator');
const schema = require('./validator/schema');
const enc = require('./middleware/encrypt');

Route.route('/login').post(validator.body(schema.login), (req, res) => {
	user.login(req, res);
});
Route.route('/register').post(validator.body(schema.register), (req, res) => {
	user.register(req, res);
});

Route.route('/bcrypt').post((req, res) => {
	res.send(enc(req.body.pass));
});

module.exports = Route;
