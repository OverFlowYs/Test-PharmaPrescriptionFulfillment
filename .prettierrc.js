export default {
  // Basic formatting
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,

  // Vue specific
  vueIndentScriptAndStyle: false,

  // HTML
  htmlWhitespaceSensitivity: 'css',

  // JavaScript/TypeScript
  arrowParens: 'avoid',
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: 'lf',

  // Override for specific file types
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
  ],
};
