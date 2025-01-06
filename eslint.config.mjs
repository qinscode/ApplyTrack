import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'

const cleanedGlobals = Object.fromEntries(
  Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
)

export default [
  {
    ignores: ['dist', 'public', 'src/components/keenicons/assets']
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      globals: cleanedGlobals
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': 'off',
      'prettier/prettier': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // 禁用对 any 的检查
      '@typescript-eslint/no-use-before-define': 'off', // 禁用使用前定义检查
      'jsx-a11y/heading-has-content': 'off', // 禁用 heading 必须有内容的检查
      'jsx-a11y/anchor-is-valid': 'off', // 禁用 a 标签必须有 href 的检查
      'react/no-unstable-context-value': 'off', // 禁用 unstable context value 的检查
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'tailwindcss/no-custom-classname': 'off', // Allow custom classnames
      'react-hooks/exhaustive-deps': 'off', // Allow not exhaustive deps
      'react/no-nested-components': 'off', // Allow nested components
      'react-dom/no-dangerously-set-innerhtml': 'off', // Allow dangerously set innerHTML
      'react-dom/no-missing-button-type': 'off' // Allow missing button type
    }
  },
  {
    files: ['**/*.tsx', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: cleanedGlobals
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      'prettier/prettier': 'warn'
    }
  }
]
