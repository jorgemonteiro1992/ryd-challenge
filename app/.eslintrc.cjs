module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended'
    ],
    rules: {
        'indent': [ 'error', 4, {
            SwitchCase: 1,
            ignoredNodes: [ 'TemplateLiteral' ]
        } ],
        "vue/html-indent": ["error", 4 ],
        'space-before-function-paren': [ 'error', 'always' ],
        'comma-dangle': [ 'error', 'never' ],
        'arrow-parens': [ 'error', 'as-needed' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'space-in-parens': [ 'error', 'always', { 'exceptions': [ '{}' ] } ],
        'no-plusplus': 'off',
        'semi': [ "error", "always" ],
        'vue/require-default-prop': 'off'
    }
};