/**
 * original
 * https://github.com/Umisyo/react-project-template/blob/master/.eslintrc.js
 */

/**
 MIT License

 Copyright (c) 2019 Souta Kusunoki a.k.a Umisyo

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

module.exports = {
  env: {
    // es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    '__DEV__': true
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    'jest',
    'prettier',
    'prefer-arrow',
  ],
  root: true,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    },
  },
  rules: {
    // eslint official
    'newline-before-return': 'error',
    'no-console': 'off',
    'require-yield': 'error',
    'prefer-template' : 'error',

    // prefer-arrow
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: false
      }
    ],

    // import
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        ts: 'never',
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['spec/**', 'test/**', 'tests/**', '**/__tests__/**', '*.config.js', '**/*.testConfig.ts', 'webpack.*'],
      optionalDependencies: false,
    }],

    // prettier
    'prettier/prettier': [
      'error', {
        bracketSpacing: true,
        printWidth: 80,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        useTabs: false
      }
    ]
  },

  overrides: [
    // TypeScript
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: "module",
        project: `./tsconfig.json`
      },
      plugins: ['@typescript-eslint'],
      rules: {
        // @typescript-eslint
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        indent: 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-namespace': 'warn',
      }
    }
  ]
}
