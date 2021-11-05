module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    // 'plugin:vue/essential',
    // 'standard'
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
    // ecmaVersion: 12,
    // parser: '@typescript-eslint/parser',
    // sourceType: 'module'
  },
  plugins: [
    // 'vue',
    // '@typescript-eslint'
  ],
  rules: {
    // 'no-unused-vars': 'warn',
    // '@typescript-eslint/no-unused-vars': 'warn',
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error'],
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-var-requires': 0,
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 5
      }
    }],
    'vue/attributes-order': ['error', {
      alphabetical: true
    }]
  },
  globals: {
    defineProps: true,
    withDefaults: true,
    defineEmits: true
  }
}
