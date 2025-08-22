import { describe, expect, it } from '@effect/vitest'
import { Logger } from 'effect'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import { hello } from '../src/hello.js'

describe('hello', () => {
  it.live('should log a greeting message', () =>
    Effect.gen(function* () {
      const messages: Array<unknown> = []
      const layer = Layer.mergeAll(
        Logger.replace(
          Logger.defaultLogger,
          Logger.make((_) => {
            messages.push(_.message)
          }),
        ),
      )
      yield* hello('Test').pipe(Effect.provide(layer))
      expect(messages.length).toBe(1)
      expect(messages).toMatchInlineSnapshot(`
        [
          [
            "Hello, Test!",
          ],
        ]
      `)

      console.log(messages)
    }),
  )
})
