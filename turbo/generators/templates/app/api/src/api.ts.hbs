import { HttpApiBuilder, HttpMiddleware, HttpServer } from '@effect/platform'
import { BunHttpServer, BunRuntime } from '@effect/platform-bun'
import { Layer } from 'effect'
import { TodoApiLive } from './todo-api.js'
import { TodoRepository } from './todo-repository.js'

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  HttpServer.withLogAddress,
  Layer.provide(TodoApiLive),
  Layer.provide(TodoRepository.Default),
  Layer.provide(BunHttpServer.layer({ port: 3000 })),
)

Layer.launch(HttpLive).pipe(BunRuntime.runMain)
