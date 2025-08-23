import { configDefaults, ViteUserConfig } from 'vitest/config'

const exclude = [
  //
  ...configDefaults.exclude,
  'turbo/generators',
  'packages/eslint-config',
  'packages/vitest-config',
]

export const sharedConfig: ViteUserConfig = {
  test: {
    globals: true,
    exclude,
    coverage: {
      exclude,
    },
  },
}
