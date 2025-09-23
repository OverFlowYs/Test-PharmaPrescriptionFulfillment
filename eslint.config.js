import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  // Base configuration
  js.configs.recommended,

  // TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        global: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        fetch: "readonly",
        Request: "readonly",
        Response: "readonly",
        Headers: "readonly",
        FormData: "readonly",
        AbortController: "readonly",
        AbortSignal: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly",
        history: "readonly",
        HTMLElement: "readonly",
        HTMLCanvasElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLFormElement: "readonly",
        Event: "readonly",
        EventTarget: "readonly",
        CustomEvent: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        TouchEvent: "readonly",
        FocusEvent: "readonly",
        InputEvent: "readonly",
        FormDataEvent: "readonly",
        File: "readonly",
        FileList: "readonly",
        FileReader: "readonly",
        Blob: "readonly",
        ArrayBuffer: "readonly",
        Uint8Array: "readonly",
        Uint16Array: "readonly",
        Uint32Array: "readonly",
        Int8Array: "readonly",
        Int16Array: "readonly",
        Int32Array: "readonly",
        Float32Array: "readonly",
        Float64Array: "readonly",
        DataView: "readonly",
        TextEncoder: "readonly",
        TextDecoder: "readonly",
        crypto: "readonly",
        SubtleCrypto: "readonly",
        CryptoKey: "readonly",
        WebSocket: "readonly",
        XMLHttpRequest: "readonly",
        RequestInfo: "readonly",
        RequestInit: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      prettier,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "prefer-const": "error",
      "@typescript-eslint/no-var-requires": "error",
      "no-unused-vars": "off",
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
      "no-console": "off",
      "no-debugger": "off",
    },
  },

  // Vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: typescriptParser,
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": typescript,
      prettier,
    },
    rules: {
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
      indent: "off",
    },
  },

  // Test files
  {
    files: ["**/*.test.ts", "**/*.test.js", "**/*.spec.ts", "**/*.spec.js"],
    languageOptions: {
      globals: {
        jest: "readonly",
        vitest: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
        mount: "readonly",
        shallowMount: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },

  // Prettier configuration
  prettierConfig,
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "*.min.js",
      "*.min.css",
    ],
  },
];
