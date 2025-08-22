import { PlopTypes } from '@turbo/gen'

export const generatorLib: PlopTypes.PlopGeneratorConfig = {
  description: 'Generator a library in ./packages',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'What type of library should be created?',
      choices: ['basic', 'react-ui'],
    },
    {
      type: 'input',
      name: 'name',
      default: ({ type }) => type,
      message: 'What is the name of library?',
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
      destination: '{{turbo.paths.root}}/packages/{{ dashCase name }}',
      base: './templates/libs/{{type}}',
      templateFiles: `./templates/libs/{{type}}/**/*`,
    },
  ],
}
