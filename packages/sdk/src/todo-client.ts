import { HttpApiClient } from '@effect/platform'
import type { TodoId } from '@repo/domain/todo-api'
import { TodoApi } from '@repo/domain/todo-api'
import { Effect } from 'effect'

export class TodoClient extends Effect.Service<TodoClient>()('cli/TodosClient', {
  accessors: true,
  effect: Effect.gen(function*() {
    const client = yield* HttpApiClient.make(TodoApi, {
      baseUrl: 'http://localhost:3000',
    })

    function create(text: string) {
      return client.todos
        .createTodo({ payload: { text } })
        .pipe(Effect.flatMap((todo) => Effect.logInfo('Created todo: ', todo)))
    }

    const list = client.todos.getAllTodos().pipe(Effect.flatMap((todos) => Effect.logInfo(todos)))

    function complete(id: TodoId) {
      return client.todos.completeTodo({ path: { id } }).pipe(
        Effect.flatMap((todo) => Effect.logInfo('Marked todo completed: ', todo)),
        Effect.catchTag('TodoNotFound', () => Effect.logError(`Failed to find todo with id: ${id}`)),
      )
    }

    function remove(id: TodoId) {
      return client.todos.removeTodo({ path: { id } }).pipe(
        Effect.flatMap(() => Effect.logInfo(`Deleted todo with id: ${id}`)),
        Effect.catchTag('TodoNotFound', () => Effect.logError(`Failed to find todo with id: ${id}`)),
      )
    }

    return {
      create,
      list,
      complete,
      remove,
    } as const
  }),
}) {}
