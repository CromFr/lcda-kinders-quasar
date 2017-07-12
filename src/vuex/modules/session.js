import * as types from '../mutation-types'

const state = {
  main: {}
}

const mutations = {
  [types.SET_SESSION] (state, payload) {
    state.main = payload
  },
  [types.PURGE_SESSION] (state) {
    state.main = {}
  }
}

export default {
  state,
  mutations
}
