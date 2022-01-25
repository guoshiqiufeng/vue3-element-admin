import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from '@/store/types'
import app from './app/app'
import login from './login/login'
const store = createStore<IRootState>({
  mutations: {},
  actions: {},
  modules: {
    app,
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IRootState> {
  return useVuexStore()
}

export default store
