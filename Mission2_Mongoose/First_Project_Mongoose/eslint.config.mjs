import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': 'error', // Example rule
      'eqeqeq': 'warn',          // Example rule
      'semi': ['error', 'always'], // Example rule for semicolons
      // Add your custom rules here
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
