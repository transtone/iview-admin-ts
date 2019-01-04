// 登录相关actions
import { login } from '@/store/api/user'

export function LoginByUsername({ commit, state }, userInfo) {
  return login(userInfo).then(rst => {
    if (rst.status === 200 && rst.data.code === 0) {
      commit('setToken', rst.data.data.token)
      commit('setPermissions', rst.data.data.permissions)
      commit('setUser', rst.data.data.user)
      return 'logined'
    } else {
      return rst.data
    }
  })
}

export function InitWS({ commit }, { url, onopen, onmessage, onclose }) {
  commit('clearWSData')
  const ws = new WebSocket(url)
  ws.onopen = onopen
  ws.onmessage = onmessage
  ws.onclose = onclose
  commit('setWS', ws)

  // state.ws.send(
  //   JSON.stringify({
  //     Type: 'Authorization',
  //     Data: rst.data.data.token
  //   })
  // )
}
