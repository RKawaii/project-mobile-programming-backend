const sequelize = require('sequelize');
const conf = require('../config/model.config');
const db = require('../database/user');

const user = db.define(
	'user',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nama: {
			type: sequelize.STRING,
			allowNull: false
		},
		email: {
			type: sequelize.STRING,
			allowNull: false
		},
		password: {
			type: sequelize.STRING,
			allowNull: false
		},
		jk: {
			type: sequelize.STRING,
			allowNull: true
		},
		status: {
			type: sequelize.STRING,
			allowNull: true
		}
	},
	conf
);

module.exports = (reqMod) => {
	switch (reqMod) {
		case 'user':
			return user;

		default:
			return undefined;
	}
};
