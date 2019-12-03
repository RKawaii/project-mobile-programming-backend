const jwt = require('jsonwebtoken');
const keys = require('../config/jwt.keys');
const bcrypt = require('bcrypt');

module.exports.auth = (req, res, next) => {
	try {
		let token = req.headers.authorization;
		token = token.split(' ')[1];
		const decoded = jwt.verify(token, keys);

		req.userData = decoded;
		next();
	} catch (error) {
		res.sendStatus(401);
	}
};

module.exports.login = (pass, passhash) => {
	console.log(
		bcrypt.compareSync(
			'1234',
			'$2y$10$7.QX8TJCOnhJyBUnjKUPnu0JrHLyF.C.lU6mqV6azMWhRA2Ll6Htm'
		)
	);

	return bcrypt.compareSync(pass, passhash);
};
