import { PlopTypes } from '@turbo/gen'
import { generatorApp } from './generator-app'
import { generatorLib } from './generator-lib'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('app', generatorApp)
  plop.setGenerator('lib', generatorLib)
}
