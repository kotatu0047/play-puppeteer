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
