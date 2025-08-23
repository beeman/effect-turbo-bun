import { configDefaults, ViteUserConfig } from 'vitest/config'

const exclude = [
  //
  ...configDefaults.exclude,
  'tmp',
  'turbo/generators',
  'packages/eslint-config',
  'packages/vitest-config',
  '**/setup-tests.ts',
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
