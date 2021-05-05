module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      legacyDecorators: true
    },
    typescript: true,
    jsx: true,
  },
  // rules: {
  //   "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
  //   "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  //   semi: [
  //     "warn",
  //     "never",
  //   ],
  //   "comma-dangle": [
  //     "warn",
  //     {
  //       arrays: "always-multiline",
  //       objects: "always-multiline",
  //       imports: "never",
  //       exports: "never",
  //       functions: "ignore"
  //     }
  //   ],
  //   "no-unused-vars": [
  //     "warn",
  //     { vars: "all", args: "after-used", ignoreRestSiblings: false }
  //   ],
  //   "brace-style": [
  //     'warn',
  //     "1tbs", { "allowSingleLine": true }
  //   ],
  //   "implicit-arrow-linebreak": ["warn", "beside"],
  //   "arrow-body-style": ["warn", "as-needed"],
  //   "object-curly-spacing": ["warn", "always"],
  //   "array-bracket-spacing": ["warn", "always"],
  //   "block-spacing": ["warn", "always"],
  //   "computed-property-spacing": ["warn", "always"],
  //   "key-spacing": [
  //     "warn",
  //     {
  //       afterColon: true,
  //       align: "colon"
  //     }
  //   ],
  //   "space-infix-ops": ["warn", { int32Hint: false }],
  //   "space-in-parens": ["warn", "always"],
  //   "object-property-newline": ["warn", { "allowMultiplePropertiesPerLine": true }]
  // },
  extends: [
    'standard',
  ]
}
