// eslint.config.js
module.exports = [
  {
    files: ["**/*.js"], // Apply these settings to all JavaScript files
    languageOptions: {
      globals: {
        ...require("globals").node,
      },
      sourceType: "commonjs", // Assuming CommonJS modules
      ecmaVersion: 2021, // Adjust as needed
    },
    rules: {
      "no-console": "warn",
      // Add other rules as needed
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "*.json",
    ],
  },
];
