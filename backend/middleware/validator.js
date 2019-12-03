const Ajv = require('ajv');
const ajv = new Ajv();

module.exports.body = (cast) => {
	return (req, res, next) => {
		const { body } = req;
		if (ajv.validate(cast, body)) {
			next();
		} else res.sendStatus(400);
	};
};
