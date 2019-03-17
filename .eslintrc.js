module.exports = {
	extends: 'aqua',
	env: { browser: true },
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: { jsx: true },
	},
	rules: {
		'arrow-body-style': 'off',
		'brace-style': ['error', 'stroustrup'],
		'comma-dangle': ['error', 'always-multiline'],
		'radix': ['error', 'as-needed'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-negated-condition': 'off',
		'operator-linebreak': ['error', 'before'],
		'quote-props': ['error', 'as-needed'],
	},
};
