// const files = require.context('.', false, /\.ts$/)
// const modules = Object.assign({}, ...files.keys().filter(key => !(/index.ts$|\s+copy.ts$/).test(key)).map(key => ({ [key.replace(/(\.\/|\.ts)/g, '')]: files(key).default })))
// // console.log('modules :>> ', modules)
// export default modules
import user, { UserState } from './user'
export interface ModulesState {
  user: UserState
}
export default {
  user
}
