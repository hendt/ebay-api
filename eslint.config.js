import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts', 'test/**/*.ts', 'examples/**/*.ts'],
    ignores: ['src/types/restful/specs/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      // Matching tslint:recommended + custom overrides
      indent: ['error', 2],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      'no-bitwise': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase', 'snake_case'],
          leadingUnderscore: 'allow'
        }
      ],
      'arrow-parens': ['error', 'as-needed'],
      'sort-keys': 'off'
    }
  }
];
