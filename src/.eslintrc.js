const path = require('path');

module.exports = {
	extends: path.join('..', '.eslintrc.js'),
	env: { jest: true },
};
