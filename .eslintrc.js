module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    // Vue rules
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "warn",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "error",
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/custom-event-name-casing": ["error", "camelCase"],
    "vue/define-macros-order": [
      "error",
      {
        order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
      },
    ],
    "vue/html-comment-content-spacing": ["error", "always"],
    "vue/no-unused-refs": "error",
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/prefer-separate-static-class": "error",
    "vue/prefer-true-attribute-shorthand": "error",
    "vue/require-macro-variable-name": "error",
    "vue/v-for-delimiter-style": ["error", "in"],

    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/no-var-requires": "error",

    // General rules
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off", // Use @typescript-eslint/no-unused-vars instead
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error",
    "template-curly-spacing": "error",
    "arrow-spacing": "error",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "func-call-spacing": ["error", "never"],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "keyword-spacing": ["error", { before: true, after: true }],
    "object-curly-spacing": ["error", "always"],
    semi: ["error", "always"],
    "semi-spacing": ["error", { before: false, after: true }],
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": ["error", "always"],
    "template-tag-spacing": ["error", "never"],
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        indent: "off", // Let Prettier handle indentation
      },
    },
    {
      files: ["*.test.ts", "*.test.js", "*.spec.ts", "*.spec.js"],
      env: {
        jest: true,
        vitest: true,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
      },
    },
  ],
};
