module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	// overrides: [
	// 	{
	// 		files: ['*.ts', '*.tsx'],
	// 		rules: {
	// 			'no-mixed-spaces-and-tabs': 'off'
	// 		}
	// 	}
	// ],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'no-empty-interface': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'no-empty-pattern': 'off',
		'@typescript-eslint/no-empty-pattern': 'off',
		'@typescript-eslint/no-empty-function': ['error', { 'allow': ['arrowFunctions'] }],
		"no-case-declarations": "off",
		"@typescript-eslint/no-case-declarations": "off",
		'no-mixed-spaces-and-tabs': 0
	}

}
