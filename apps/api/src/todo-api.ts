import { HttpApiBuilder } from '@effect/platform'
import { TodoApi } from '@repo/domain/todo-api'
import { Effect, Layer } from 'effect'
import { TodoRepository } from './todo-repository.js'

const TodoApiGroup = HttpApiBuilder.group(TodoApi, 'todos', (handlers) =>
  Effect.gen(function*() {
    const todos = yield* TodoRepository
    return handlers
      .handle('getAllTodos', () => todos.getAll)
      .handle('getTodoById', ({ path: { id } }) => todos.getById(id))
      .handle('createTodo', ({ payload: { text } }) => todos.create(text))
      .handle('completeTodo', ({ path: { id } }) => todos.complete(id))
      .handle('removeTodo', ({ path: { id } }) => todos.remove(id))
  }))
export const TodoApiLive = HttpApiBuilder.api(TodoApi).pipe(Layer.provide(TodoApiGroup))
