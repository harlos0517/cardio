import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { logout } from '@/routes/user'
import { User } from '@api/user'

export type UserState = {
  loggedIn: boolean
  googleId: string | null
  email: string | null
  name: string | null
}

export const state = () => ({
  loggedIn: false,
  googleId: null,
  email: null,
} as UserState)

export const getters: GetterTree<UserState, UserState> = {
  loggedIn: state => state.loggedIn,
  email: state => state.email,
}

export const mutations: MutationTree<UserState> = {
  setUser: (state, user: User) => {
    state.googleId = user.googleId || null
    state.email = user.email || null
    state.name = user.name
    state.loggedIn = true
  },
  resetUser: state => {
    state.loggedIn = false
    state.googleId = null
    state.email = null
    state.name = null
  },
}

export const actions: ActionTree<UserState, UserState> = {
  logout({ commit }) {
    logout()(this.$axios).then(_ => {
      commit('resetUser')
    }).catch()
  },
}
