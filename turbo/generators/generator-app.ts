import { PlopTypes } from '@turbo/gen'

export const generatorApp: PlopTypes.PlopGeneratorConfig = {
  description: 'Generator an application in ./apps',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'What type of application should be created?',
      choices: ['basic', 'cli', 'server'],
    },
    {
      type: 'input',
      name: 'name',
      default: ({ type }) => type,
      message: 'What is the name of application?',
      validate: (input: string) => {
        if (input.includes('.')) {
          return 'file name cannot include an extension'
        }
        if (input.includes(' ')) {
          return 'file name cannot include spaces'
        }
        if (!input) {
          return 'file name is required'
        }
        return true
      },
    },
  ],
  actions: [
    {
      type: 'addMany',
      destination: '{{turbo.paths.root}}/apps/{{ dashCase name }}',
      base: './templates/apps/_',
      templateFiles: `./templates/apps/_/**/*`,
    },
    {
      type: 'addMany',
      destination: '{{turbo.paths.root}}/apps/{{ dashCase name }}',
      base: './templates/apps/{{type}}',
      templateFiles: `./templates/apps/{{type}}/**/*`,
    },
  ],
}
