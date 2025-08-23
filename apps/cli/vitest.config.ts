import { sharedConfig } from '@repo/vitest-config'
import { join } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  ...sharedConfig,
  test: {
    ...sharedConfig.test,
    setupFiles: [join(__dirname, 'setup-tests.ts')],
  },
})
