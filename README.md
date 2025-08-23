# Turborepo Effect Bun starter

This is a starter project with the following features:

- [Effect](https://effect.website) for maximum type-safety incl. error handling, composability and observability 
- [Turborepo](https://turborepo.com) monorepo with `apps` and `packages`
- [Turborepo Generators](https://turborepo.com/docs/guides/generating-code) to scaffold new `apps` and `packages`
- [Bun](https://bun.com) package manager and runtime 
- [Eslint](https://eslint.org) and [dprint](https://dprint.dev) for linting/formatting 
- [Vitest](https://vitest.dev) for testing
- [GitHub Actions](https://github.com/features/actions) for CI

## Structure

This monorepo is managed by Turborepo and contains the following:

-   `apps`: Standalone applications.
    -   `api`: An example API server.
    -   `cli`: An example CLI application.
-   `packages`: Shared packages used by the applications.
    -   `domain`: Shared domain models and schemas.
    -   `sdk`: A generated client for the API.
    -   `eslint-config`, `typescript-config`, `vitest-config`: Shared configurations for linting, TypeScript, and testing.
-   `turbo/generators`: Scripts for the [Code generation](#code-generation) feature.

## Requirements

- [bun](https://bun.com) v1.2+

## Getting started

```shell
git clone https://github.com/beeman/effect-turbo-bun effect-app
cd effect-app
bun install
# Make sure to do a build after the installation so that the vitest-config package gets built 
bun turbo build
```

This repo comes with a workflow to publish snapshots on [pkg.pr.new](https://pkg.pr.new/).

Make sure to add the [pkg-pr-new app](https://github.com/apps/pkg-pr-new) to your repo or remove
`./.github/workflows/snapshot.yml` if you're not interested in publishing them.

## Commands


### Build

Run the `build` command in all packages in this repo:

```shell
bun turbo build
```

Run `build` for an individual package:

```shell
bun turbo build -F @repo/api
```

Or, move to the package and run `build`:

```shell
cd apps/api
bun run build
```

### Developing

Run the `dev` command in all packages in this repo:

```shell
bun turbo dev
```

Run `dev` for an individual package:

```shell
bun turbo dev -F @repo/api
```

Or, move to the package and run `dev`:

```shell
cd apps/api
bun run dev
```

### Testing

Run the `test` command in all packages in this repo:

```shell
bun turbo test
```

Run the `test` command with coverage (note: `bun run`, not `bun turbo run`):

```shell
bun run test --coverage
```

Run the `test` command in all packages in this repo in watch mode:

```shell
bun turbo test:watch
```

Run `test` for an individual package:

```shell
bun turbo test -F @repo/api
```

Or, move to the package and run the command:

```shell
cd apps/api
bun run test
bun run test:watch
```


### Linting

Run the `lint` command in all packages in this repo:

```shell
bun turbo lint
```

Run `lint` for an individual package:

```shell
bun turbo lint -F @repo/api
```

Or, move to the package and run the command:

```shell
cd apps/api
bun run lint
```

### Type checking

Run the `check-types` command in all packages in this repo:

```shell
bun turbo check-types
```

Run `check-types` for an individual package:

```shell
bun turbo check-types -F @repo/api
```

Or, move to the package and run the command:

```shell
cd apps/api
bun run check-types
```

## Code generation

This workspace has [Turbo generators](https://turborepo.com/docs/guides/generating-code) that you can use to
create new `apps` and `packages`.

### Generators

The repo comes with the following generators:

- `app`
    - Generates a new app in `./apps/<name>`
    - It supports the following types:
        - `api`: an Effect api
        - `basic`: a basic Effect app
        - `cli`: an Effect cli
- `pkg`
    - Generates a new package in `./packages/<name>`
    - It supports the following types:
        - `basic`: a basic Effect package
        - `react-ui`: a package to be used with React

### Interactive

Start the wizard with the following command:

```shell
bun turbo gen
```

### One-liners

Provide the arguments to automate this:

```shell
bun turbo gen app # this will pick the application generator
bun turbo gen app --args basic # pick 'basic' for the first prompt
bun turbo gen app --args basic sandbox # use 'sandbox' for the app name
```

### Custom generators

Refer to the [Turbo generators docs](https://turborepo.com/docs/guides/generating-code) to learn more about the
generator and how to customize them or copy and adjust the existing ones.

Speedrun to a new generator:

Create the generator configuration:

```ts
// turbo/generators/generator-service.ts
import { PlopTypes } from '@turbo/gen'

export const generatorService: PlopTypes.PlopGeneratorConfig = {
  description: 'Generator an effect service',
  prompts: [
    // Add you prompts
  ],
  actions: [
    // Add your actions
  ],
}
```

Add them to the generator config:

```ts
// turbo/generators/config.ts
// ... existing imports
import { generatorService } from './generator-service'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // ... existing generators
  plop.setGenerator('service', generatorService)
}
```

While you're developing your generators, it's helpful to have a command that removes the previous attempt and
re-generates in one shot:

```shell
# Use this to iterate over the `app` generator
rm -rf apps/sandbox && bun turbo gen app --args basic sandbox
```