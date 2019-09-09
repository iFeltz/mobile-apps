import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null,
    appsFilter: []
  },
  mutations: {
    setData (state, payload) {
      state.data = payload

      Object.keys(payload).forEach(el => {
        let obj = {
          id: el,
          model: -1,
          rating: -1
        }

        state.appsFilter.push(obj)
      })
    }
  },
  actions: {
    async fetchData ({ commit }, payload) {
      try {
        const res = await axios.get('./apps.json')
        commit('setData', res.data)
        return res.data
      } catch (err) {
        console.error(err.message)
      }
    }
  }
})
