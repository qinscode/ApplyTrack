import antfu from "@antfu/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";
import jestDom from "eslint-plugin-jest-dom";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tailwind from "eslint-plugin-tailwindcss";
import testingLibrary from "eslint-plugin-testing-library";

export default antfu(
  {
    react: true,
    typescript: true,

    lessOpinionated: true,
    isInEditor: false,

    stylistic: {
      quotes: "double",

      semi: true,
    },

    formatters: {
      css: true,
    },

    ignores: ["migrations/**/*", "next-env.d.ts", "scripts/**/*", ".next/**/*"],
  },
  ...tailwind.configs["flat/recommended"],

  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-console": "off", // 禁用 console 检查
      "@typescript-eslint/no-explicit-any": "off", // 禁用对 any 的检查
      "@typescript-eslint/no-use-before-define": "off", // 禁用使用前定义检查
      "jsx-a11y/heading-has-content": "off", // 禁用 heading 必须有内容的检查
      "jsx-a11y/anchor-is-valid": "off", // 禁用 a 标签必须有 href 的检查
      "react/no-unstable-context-value": "off", // 禁用 unstable context value 的检查
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "tailwindcss/no-custom-classname": "off", // Allow custom classnames
      "react-hooks/exhaustive-deps": "off", // Allow not exhaustive deps
      "react-refresh/only-export-components": "off", // Allow not only export components
      "react/no-nested-components": "off", // Allow nested components
      "react-dom/no-dangerously-set-innerhtml": "off", // Allow dangerously set innerHTML
      "react-dom/no-missing-button-type": "off", // Allow missing button type
    },
  },
  {
    files: ["**/*.test.ts?(x)"],
    ...testingLibrary.configs["flat/react"],
    ...jestDom.configs["flat/recommended"],
  },
  {
    files: ["**/*.spec.ts", "**/*.e2e.ts"],
  },
  {
    rules: {
      "antfu/no-top-level-await": "off", // Allow top-level await
      "style/brace-style": ["error", "1tbs"], // Use the default brace style
      "ts/consistent-type-definitions": ["error", "type"], // Use `type` instead of `interface`
      "react/prefer-destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      "node/prefer-global/process": "off", // Allow using `process.env`
      "test/padding-around-all": "error", // Add padding in test files
      "test/prefer-lowercase-title": "off", // Allow using uppercase titles in test titles
      "react/no-clone-element": "off", // Allow using `cloneElement`
      // "tailwindcss/classnames-order": "off", // Allow custom classnames order
    },
  },
);
