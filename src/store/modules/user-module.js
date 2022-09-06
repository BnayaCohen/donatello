import { userService } from '../../services/user-service.js'

export default {
  state: {
    user: userService.getLoggedInUser(),
    users: null,
  },
  getters: {
    user({ user }) {
      return user
    },
    users({ users }) {
      return users
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user
    },
    setUsers(state, { users }) {
      state.users = users
    },
    setUserAsGuest(state) {
      state.user = userService.getDefaultGuest()
    },
  },
  actions: {
    async logout({ commit }) {
      await userService.logout()
      commit({ type: 'setUser', user: null })
    },
    async login({ commit }, { credentials }) {
      try {
        const user = await userService.login(credentials)
        console.log(user)
        commit({ type: 'setUser', user })
        return user
      } catch (err) {
        console.log('Cannot sign in', err)
      }
    },
    async signup({ commit }, { signupInfo }) {
      try {
        const user = await userService.signup(signupInfo)
        commit({ type: 'setUser', user })
        return user
      } catch (err) {
        console.log('Cannot signup', err)
      }
    },
    async getUsers({ commit }, { filterBy }) {
      try {
        const users = await userService.query(filterBy)
        commit({ type: 'setUsers', users })
        return users
      } catch (err) {
        console.log('Cannot get users')
      }
    },
  },
}