import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import pluginTailwindcss from "eslint-plugin-tailwindcss";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "build/**",
      "*.config.js",
      // 'components/ui/**'
    ],
  },
  ...pluginTailwindcss.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      "react-hooks": reactHooks,
      tailwindcss: pluginTailwindcss,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      // Having warns pollutes in case of errors.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
      // '@typescript-eslint/no-floating-promises': 'error', -- enable in the future
      // Additional AI-friendly rules
      "no-useless-escape": "off",
      "@typescript-eslint/ban-ts-comment": "off", // Allow @ts-ignore when needed
      "@typescript-eslint/no-non-null-assertion": "off", // Allow ! operator
      "no-console": "off", // Allow console.log for debugging
      "prefer-const": "off", // Warn instead of error for let vs const
      // tailwindcss rules
      "tailwindcss/no-custom-classname": "off", // Allow custom classes
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "off",
      "tailwindcss/enforces-shorthand": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"],
        config: "./tailwind.config.js",
      },
    },
  },
];
