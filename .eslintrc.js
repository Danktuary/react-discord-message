module.exports = {
	extends: 'sora',
	env: { browser: true },
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: { jsx: true },
	},
	rules: {
		semi: ['warn', 'never'],
	},
};
