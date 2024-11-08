import tseslint from 'typescript-eslint'

import baseConfig from '../eslint.config'

export default tseslint.config(
  {
    extends: [...baseConfig],
    rules: {
      'no-unused-vars': 'off',
    },
  },
)
