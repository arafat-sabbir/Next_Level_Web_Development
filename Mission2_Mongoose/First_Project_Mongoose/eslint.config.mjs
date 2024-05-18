import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': 'error',
      'eqeqeq': 'warn',
      'semi': ['error', 'always'],
      // Add your custom rules here
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
