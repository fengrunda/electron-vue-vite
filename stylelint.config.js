module.exports = {
  plugins: [
    'stylelint-scss'
  ],
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-rational-order'
    'stylelint-config-recess-order',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-html'
  ],
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        // 'unit-allowed-list': ['em', 'rem', 's']
      }
    }
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['/deep/'] }],
    'no-invalid-position-at-import-rule': null,
    'at-rule-no-unknown': null,
    'no-empty-source': null,
    'scss/at-rule-no-unknown': true,
    'scss/comment-no-empty': null,
    'selector-class-pattern': '^[a-z][a-z0-9_-]+$',
    'selector-id-pattern': '^[a-z][a-z0-9_-]+$',
    'scss/dollar-variable-pattern': '^[a-zA-Z_][a-zA-Z0-9_-]+$',
    'keyframes-name-pattern': '^[A-Z][a-zA-Z0-9_-]+$',
    'custom-property-pattern': '^[a-zA-Z_][a-zA-Z0-9_-]+$',
    'color-function-notation': 'legacy'
  }
}
