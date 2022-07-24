import { userService } from "../../services/user-service.js"

export default {
    state: {
        user: null
    },
    getters: {
        user({ user }) { return user }
    },
    mutations: {
        saveUser(state, { user }) {
            state.user = JSON.parse(JSON.stringify(user))
        },
    },
    actions: {
        loadUser({ commit }) {
            commit({ type: 'saveUser', user: userService.getLoggedInUser() })
        },
        async logout({commit}){
           await userService.logout()
           commit({ type: 'saveUser', user: null })
        }
    }
}