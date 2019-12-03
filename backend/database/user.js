const sequelize = require('sequelize');
const user = require('../config/user.db.config');

const db = new sequelize(user.database, user.username, user.password, {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: (log) => {
		if (process.env.NODE_ENV !== 'production') {
			console.log(log);
		}
	}
});

db.authenticate()
	.then(() => {
		console.log('user Connection has been established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = db;
