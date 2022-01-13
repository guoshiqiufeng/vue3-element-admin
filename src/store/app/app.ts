import { Module } from 'vuex'
import { IAppState } from './types'
const appModule: Module<IAppState, any> = {
  namespaced: true,
  state() {
    return {
      salt: 'vea'
    }
  },
  getters: {},
  mutations: {},
  actions: {}
}
export default appModule
