// @ts-check
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const js = require('@eslint/js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // ESLint
      'no-extra-boolean-cast': 'off',
      'max-len': ['warn', { code: 130, tabWidth: 2, ignoreStrings: true }],
      'no-console': 'error',
      'no-import-assign': 'error',
      'no-multi-spaces': 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],

      // TypeScript
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',

      // React
      'react/button-has-type': 'error',
      'react/default-props-match-prop-types': 'error',
      'react/destructuring-assignment': ['error', 'always'],
      'react/forbid-foreign-prop-types': 'error',
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/no-access-state-in-setstate': 'error',
      'react/no-adjacent-inline-elements': 'error',
      'react/no-array-index-key': 'error',
      'react/no-danger': 'error',
      'react/no-did-mount-set-state': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-multi-comp': ['error', { ignoreStateless: true }],
      'react/no-redundant-should-component-update': 'error',
      'react/no-set-state': 'error',
      'react/no-this-in-sfc': 'error',
      'react/no-typos': 'error',
      'react/no-unsafe': 'error',
      'react/no-unused-prop-types': 'warn',
      'react/no-unused-state': 'error',
      'react/no-will-update-set-state': 'error',
      'react/prefer-es6-class': 'error',
      'react/prefer-read-only-props': 'error',
      'react/prefer-stateless-function': 'error',
      'react/require-optimization': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': 'error',
      'react/sort-prop-types': 'error',
      'react/state-in-constructor': 'error',
      'react/static-property-placement': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',

      // JSX
      'react/jsx-boolean-value': 'error',
      'react/jsx-child-element-spacing': 'error',
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'always' }],
      'react/jsx-curly-newline': 'error',
      'react/jsx-curly-spacing': 'error',
      'react/jsx-equals-spacing': 'error',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/jsx-first-prop-new-line': 'error',
      'react/jsx-fragments': 'error',
      'react/jsx-handler-names': 'error',
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-literals': 'error',
      'react/jsx-no-script-url': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-tag-spacing': 'error',
      'react/jsx-wrap-multilines': 'error',

      // React Hooks
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];
