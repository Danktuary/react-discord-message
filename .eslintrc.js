module.exports = {
	extends: [
		'plugin:react/recommended',
		'sora',
	],
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
	settings: {
		react: {
			version: '^17.0.0',
		},
	},
}
