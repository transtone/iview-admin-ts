import {
  login,
  logout,
  getUserInfo as getUserInfoApi,
  getMessage as getMessageApi,
  getContentByMsgId as getContentByMsgIdApi,
  hasRead as hasReadApi,
  removeReaded as removeReadedApi,
  restoreTrash as restoreTrashApi,
  getUnreadCount as getUnreadCountApi
} from '@/api/user'

// 登录
export function handleLogin({ commit }, { userName, password }) {
  userName = userName.trim()
  return new Promise((resolve, reject) => {
    login({
      userName,
      password
    })
      .then(res => {
        const data = res.data
        commit('setToken', data.token)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 退出登录
export function handleLogOut({ state, commit }) {
  return new Promise((resolve, reject) => {
    logout(state.token)
      .then(() => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
    // commit('setToken', '')
    // commit('setAccess', [])
    // resolve()
  })
}

// 获取用户相关信息
export function getUserInfo({ state, commit }) {
  return new Promise((resolve, reject) => {
    try {
      getUserInfoApi(state.token)
        .then(res => {
          const data = res.data
          commit('setAvator', data.avator)
          commit('setUserName', data.name)
          commit('setUserId', data.user_id)
          commit('setAccess', data.access)
          commit('setHasGetInfo', true)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

// 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
export function getUnreadMessageCount({ state, commit }) {
  getUnreadCountApi().then(res => {
    const { data } = res
    commit('setMessageCount', data)
  })
}

// 获取消息列表，其中包含未读、已读、回收站三个列表
export function getMessageList({ state, commit }) {
  return new Promise((resolve, reject) => {
    getMessageApi()
      .then(res => {
        const { unread, readed, trash } = res.data
        commit(
          'setMessageUnreadList',
          unread.sort(
            (a, b) => new Date(b.create_time) - new Date(a.create_time)
          )
        )
        commit(
          'setMessageReadedList',
          readed
            .map(_ => {
              _.loading = false
              return _
            })
            .sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
        )
        commit(
          'setMessageTrashList',
          trash
            .map(_ => {
              _.loading = false
              return _
            })
            .sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
        )
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 根据当前点击的消息的id获取内容
export function getContentByMsgId({ state, commit }, { msg_id }) {
  return new Promise((resolve, reject) => {
    let contentItem = state.messageContentStore[msg_id]
    if (contentItem) {
      resolve(contentItem)
    } else {
      getContentByMsgIdApi(msg_id).then(res => {
        const content = res.data
        commit('updateMessageContentStore', { msg_id, content })
        resolve(content)
      })
    }
  })
}

// 把一个未读消息标记为已读
export function hasRead({ state, commit }, { msg_id }) {
  return new Promise((resolve, reject) => {
    hasReadApi(msg_id)
      .then(() => {
        commit('moveMsg', {
          from: 'messageUnreadList',
          to: 'messageReadedList',
          msg_id
        })
        commit('setMessageCount', state.unreadCount - 1)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 删除一个已读消息到回收站
export function removeReaded({ commit }, { msg_id }) {
  return new Promise((resolve, reject) => {
    removeReadedApi(msg_id)
      .then(() => {
        commit('moveMsg', {
          from: 'messageReadedList',
          to: 'messageTrashList',
          msg_id
        })
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 还原一个已删除消息到已读消息
export function restoreTrash({ commit }, { msg_id }) {
  return new Promise((resolve, reject) => {
    restoreTrashApi(msg_id)
      .then(() => {
        commit('moveMsg', {
          from: 'messageTrashList',
          to: 'messageReadedList',
          msg_id
        })
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}
