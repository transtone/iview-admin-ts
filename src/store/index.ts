import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  key: 'iview',
  modules: ['user'],
  storage: window.localStorage
})

const getters: any = require('./getters')
import user from './modules/user'
import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  modules: {
    user,
    app
  },
  plugins: [vuexLocal.plugin]
})

export default store
