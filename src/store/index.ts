import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from '@/store/types'
import app from './app/app'
import login from './login/login'
const store = createStore<IRootState>({
  state: {
    name: 'vue3-element-admin'
  },
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

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
