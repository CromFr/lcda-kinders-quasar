import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules,
  strict: true,
  plugins: [createPersistedState('lcda-kinders')]
})
