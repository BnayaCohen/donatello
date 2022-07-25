import { userService } from '../../services/user-service.js'

export default {
  state: {
    user: null,
  },
  getters: {
    user({ user }) {
      return user
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user
    },
  },
  actions: {
    async logout({ commit }) {
      await userService.logout()
      commit({ type: 'saveUser', user: null })
    },
    async login({ commit }, { credentials }) {
      try {
        const user = await userService.login(credentials)
        commit({ type: 'setUser', user })
        return user
      } catch (err) {
        console.log('Cannot sign in', err)
      }
    },
  },
}
