import * as actions from './actions'

const state = {
  token: '', // 后台的认证jwt，不能写null
  user: {},
  permissions: [],
  userinfo: {},
  ws: '',
  wsData: []
}
const mutations = {
  setToken(state, token) {
    state.token = token
  },

  setUser(state, user) {
    state.user = user
  },

  setPermissions(state, permissions) {
    state.permissions = permissions
  },

  setUserInfo(state, userinfo) {
    state.userinfo = userinfo
  },

  clearData(state) {
    state.token = ''
    state.permissions = []
    state.user = {}
    state.userinfo = {}
  },

  setWS(state, ws) {
    state.ws = ws
  },

  addWSData(state, data) {
    state.wsData.push(data)
  },

  delWSData(state, idx) {
    state.wsData.splice(idx, 1)
  },

  clearWSData(state) {
    state.wsData = []
  }
}

export default {
  state,
  actions,
  mutations
}
