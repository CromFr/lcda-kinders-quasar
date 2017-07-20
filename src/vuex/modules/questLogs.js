import * as types from '../mutation-types'

const state = {
  main: {
    // bicFileName: []
  }
}

const mutations = {
  [types.SET_QUEST_LOG] (state, payload) {
    state.main[payload.bicFileName] = payload.questLog
  },
  [types.PURGE_SESSION] (state) {
    state.main = {}
  }
}

export default {
  state,
  mutations
}
