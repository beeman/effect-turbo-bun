import * as Effect from 'effect/Effect'

export const hello = Effect.fn(function*(name: string) {
  yield* Effect.logInfo(`Hello, ${name}!`)
})
