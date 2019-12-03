const model = require('../models/user');
const enc = require('../middleware/encrypt').default;
const cmp = require('../middleware/auth').login;
const jwt = require('jsonwebtoken');
const keys = require('../config/jwt.keys');

const getData = (path, body) => {
	let data;
	switch (path) {
		case 'user':
			data = {
				nama: body.nama,
				email: body.email,
				password: enc(body.password),
				jk: body.jk
			};
			break;
	}
	return data;
};

const get = (req, res, path) => {
	const { params, query } = req;
	let cond = {};
	if (params.id !== undefined) {
		cond.where.id = params.id;
	}
	cond.limit = 10;
	if (query.overrideLimit === true) {
		if (typeof query.limit === 'number') {
			cond.limit = query.limit ? query.limit : 10;
		}
	}
	if (typeof query.offset === 'number') {
		cond.offset = query.offset ? query.offset : 0;
	}

	model(path)
		.findAll(cond)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const add = (req, res, path) => {
	const { body } = req;
	const data = getData(path, body);

	model(path)
		.create(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const upd = (req, res, path) => {
	const { body } = req;
	const { params } = req;
	let cond = {};
	cond.where.id = params.id;

	const data = getData(path, body);

	model(path)
		.update(data, cond)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const del = (req, res, path) => {
	const { params } = req;
	model(path)
		.destroy({ where: { id: params.id } })
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const login = async (req, res) => {
	const { body } = req;
	const result = await model('user')
		.findOne({ where: { email: body.email, status: 'active' } })
		.then((r) => {
			if (cmp(body.password, r.password)) {
				const token = jwt.sign(
					{
						role: 'user',
						id: r.id
					},
					keys,
					{ expiresIn: '3h' }
				);
				return { loggedAs: 'user', token: token };
			} else return 422;
		})
		.catch((err) => {
			if (process.env.NODE_ENV === 'development') {
				console.log(err);
			}
			return 404;
		});

	if (typeof result === 'object') {
		res.json(result);
	} else if (typeof result === 'number') {
		res.sendStatus(result);
	} else res.sendStatus(400);
};

module.exports = {
	get: get,
	add: add,
	upd: upd,
	del: del,
	login: login
};
