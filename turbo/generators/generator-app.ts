import { PlopTypes } from '@turbo/gen'
import { validateName } from './helpers'

const TARGET_DIR = 'apps'
const TEMPLATE_ROOT = 'templates/app'

export const generatorApp: PlopTypes.PlopGeneratorConfig = {
  description: `Generator an application in the ${TARGET_DIR} directory`,
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'What type of application should be created?',
      choices: ['api', 'basic', 'cli'],
    },
    {
      type: 'input',
      name: 'name',
      default: ({ type }) => type,
      message: 'What is the name of application?',
      validate: (input: string) => {
        return validateName(input)
      },
    },
  ],
  actions: [
    {
      type: 'addMany',
      destination: `{{turbo.paths.root}}/${TARGET_DIR}/{{ dashCase name }}`,
      base: `./${TEMPLATE_ROOT}/_`,
      templateFiles: `./${TEMPLATE_ROOT}/_/**/*`,
    },
    {
      type: 'addMany',
      destination: `{{turbo.paths.root}}/${TARGET_DIR}/{{ dashCase name }}`,
      base: `./${TEMPLATE_ROOT}/{{type}}`,
      templateFiles: `./${TEMPLATE_ROOT}/{{type}}/**/*`,
    },
  ],
}
