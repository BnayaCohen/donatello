import { userService } from '../../services/user-service.js'

export default {
  state: {
    user: userService.getLoggedInUser(),
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
    async signup({commit}, {signupInfo}) {
        try {
            const user = await userService.signup(signupInfo)
            commit({ type: 'setUser', user })
            return user    
        } catch (err) {
            console.error('cannot signup', err)
        }
    }
  },
}
