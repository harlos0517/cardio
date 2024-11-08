import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

import baseConfig from '../eslint.config'

// https://stackoverflow.com/questions/76707089/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactRecommended = react.configs.recommended as any
reactRecommended.plugins = { react }
reactRecommended.languageOptions = { parserOptions: reactRecommended.parserOptions }
delete reactRecommended.parserOptions

const reactHooksRecommended = reactHooks.configs.recommended
reactHooksRecommended.plugins = { react }
reactHooksRecommended.languageOptions = { parserOptions: reactHooksRecommended.parserOptions }
delete reactHooksRecommended.parserOptions
// End fix

export default tseslint.config(
  {
    extends: [
      ...baseConfig,
      reactRecommended,
      reactHooksRecommended,
    ],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      react: react as any,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
)
