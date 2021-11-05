
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user, { UserState } from './modules/user'

const debug = process.env.NODE_ENV !== 'production'

export interface RootState {
  user: UserState
}

export const key: InjectionKey<Store<RootState>> = Symbol('vuex')

const store = createStore<RootState>({
  modules: {
    user
  },
  plugins: debug
    ? [
      createLogger({
        collapsed: true,
        logger: console
      }),
      createPersistedState()
    ]
    : [createPersistedState()]
})
export default store

// define your own `useStore` composition function
export function useStore (): Store<RootState> {
  return baseUseStore<RootState>(key)
}
