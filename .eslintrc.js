module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  }, // to enable features such as async/await
  ignorePatterns: [
    "node_modules/*",
    ".next/*",
    ".out/*",
    "out/*",
    "!.prettierrc.js",
  ], // We don"t want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ["eslint:recommended", "plugin:@next/next/recommended"],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ["**/*.js", "**/*.jsx"],
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:react/recommended", // React rules
        "plugin:react-hooks/recommended", // React hooks rules
        "plugin:jsx-a11y/recommended", // Accessibility rules
        "plugin:prettier/recommended", // Prettier plugin
        "plugin:@next/next/recommended",
      ],
      rules: {
        // We will use TypeScript"s types for component props instead
        "react/prop-types": "off",

        // No need to import React when using Next.js
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",

        // This rule is not compatible with Next.js"s <Link /> components
        "jsx-a11y/anchor-is-valid": "off",

        "jsx-a11y/no-autofocus": "off",
        "jsx-a11y/media-has-caption": "off",
        "no-unused-vars": "warn",
        "prettier/prettier": ["error", {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
      },
    },
  ],
};
