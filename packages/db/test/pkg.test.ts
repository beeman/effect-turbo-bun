import { describe, expect, it } from '@effect/vitest'
import * as Effect from 'effect/Effect'

describe('db', () => {
  it.effect('should test Effect succeed case', () =>
    Effect.gen(function*() {
      expect.assertions(1)
      const result = yield* Effect.succeed(true)
      expect(result).toBe(true)
    }))

  it.effect('should test Effect fail case', () =>
    Effect.gen(function*() {
      expect.assertions(1)
      const result = yield* Effect.flip(Effect.fail('error'))
      expect(result).toBe('error')
    }))
})
