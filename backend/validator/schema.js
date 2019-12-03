const login = {
	type: 'object',
	properties: {
		role: { type: 'string' },
		email: { type: 'string' },
		password: { type: 'string' }
	},
	required: ['role', 'email', 'password']
};

const register = {
	type: 'object',
	properties: {
		nama: { type: 'string' },
		email: { type: 'string' },
		password: { type: 'string' },
		jk: { type: 'string', enum: ['laki-laki', 'perempuan'] }
	},
	required: ['nama', 'email', 'password', 'jk']
};

module.exports = {
	login: login,
	register: register
};
