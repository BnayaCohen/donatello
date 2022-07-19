import { createStore } from 'vuex'
import userStore from './modules/user-module.js'
import boardStore from './modules/board-module.js'
// create a store instance
const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
  },
})

export default store
