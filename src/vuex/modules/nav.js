import * as types from '../mutation-types'

const state = {
  main: {
    character: false,
    path: '',
    sub: ''
  }
}

const mutations = {
  [types.SET_NAV] (state, payload) {
    state.main = payload
  },
  [types.PURGE_SESSION] (state) {
    state.main = {
      character: false,
      path: '',
      sub: ''
    }
  }
}

export default {
  state,
  mutations
}
