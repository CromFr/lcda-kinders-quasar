import * as types from '../mutation-types'

const state = {
  main: {
    active: [
    //   {
    //     bicFileName: 'toto',
    //     name: 'Toto',
    //     classes: { barde: 30 },
    //     lvl: 30,
    //     race: 'Aasimar',
    //     status: 'active'
    //   }
    ],
    inactive: []
  }
}

const mutations = {
  [types.SYNC_CHAR_LISTS] (state, payload) {
    state.main = payload
  },
  [types.PURGE_SESSION] (state) {
    state.main = {
      active: [],
      inactive: []
    }
  }
}

export default {
  state,
  mutations
}
