module.exports = {
  root: true,
  env: {
    node: true,
    es2023: true
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'scripts/**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        // TypeScript 规则
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
        
        // Node.js 相关
        'no-console': 'off',
        'no-process-exit': 'off',
        
        // 代码风格
        'prefer-const': 'error',
        'no-var': 'error',
        'eqeqeq': ['error', 'always']
      }
    },
    {
      files: ['scripts/**/*.js'],
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module'
      },
      extends: ['eslint:recommended'],
      rules: {
        // Node.js 相关
        'no-console': 'off',
        'no-process-exit': 'off',
        
        // 代码风格
        'prefer-const': 'error',
        'no-var': 'error',
        'eqeqeq': ['error', 'always']
      }
    }
  ],
  ignorePatterns: [
    'dist/**',
    'bin/**', 
    'node_modules/**',
    'templates/**'
  ]
}
