import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, setHistory, getHistory, removeHistory } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    history: getHistory() || []
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setToken(payload)
    },
    getHistorys (state, history) {
      state.history.unshift(history)
      setHistory(state.history)
    },
    delHistorys (state, history) {
      console.log(state)
      removeHistory()
      state.history = history
      setHistory(state.history)
    }
  },
  actions: {},
  modules: {}
})
