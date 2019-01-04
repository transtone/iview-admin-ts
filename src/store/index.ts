import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  key: 'iview',
  modules: ['login'],
  storage: window.localStorage
})

const getters: any = require('./getters')
import login from './modules/login'
// import sys from "./modules/sys";

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  modules: {
    login
    // sys
  },
  plugins: [vuexLocal.plugin]
})

export default store
