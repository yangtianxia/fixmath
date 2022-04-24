import { Chain } from './chain'

export { version as VERSION } from '../package.json'
export * from './base'

export const chain = function(...args: any[]) {
  return new Chain(...args)
}