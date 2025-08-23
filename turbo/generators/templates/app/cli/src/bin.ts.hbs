#!/usr/bin/env bun

import { FetchHttpClient } from '@effect/platform'
import { BunContext, BunRuntime } from '@effect/platform-bun'
import { TodoClient } from '@repo/sdk/todo-client'
import { Effect, Layer } from 'effect'
import { cli } from './cli.js'

const MainLive = TodoClient.Default.pipe(Layer.provide(FetchHttpClient.layer), Layer.merge(BunContext.layer))

cli(process.argv).pipe(Effect.provide(MainLive), BunRuntime.runMain)
