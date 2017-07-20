import * as types from '../mutation-types'

const state = {
  main: {
    // bicFileName: {
    //   abilities: [],
    //   alignment: {},
    //   classes: {},
    //   god: '',
    //   lvl: 0,
    //   name: '',
    //   race: ''
    // }
  }
}

const mutations = {
  [types.SET_CHARACTER] (state, payload) {
    console.log(payload)
    state.main[payload.bicFileName] = payload.character
  },
  [types.PURGE_SESSION] (state) {
    state.main = {}
  }
}

export default {
  state,
  mutations
}
