import * as types from '../mutation-types'

const state = {
  main: {
    // bicFileName: []
  }
}

const mutations = {
  [types.SET_KINDERS] (state, payload) {
    state.main[payload.bicFileName] = payload.kinders
  },
  [types.PURGE_SESSION] (state) {
    state.main = {}
  }
}

export default {
  state,
  mutations
}
