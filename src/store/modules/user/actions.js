import {
  login,
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
  return login({
    userName,
    password
  })
    .then(res => {
      const data = res.data
      commit('setToken', data.token)
    })
    .catch(err => {
      return err
    })
}

// 退出登录
export function handleLogOut({ commit }) {
  commit('setToken', '')
  commit('setAccess', [])
}

// 获取用户相关信息
export function getUserInfo({ state, commit }) {
  return getUserInfoApi(state.token)
    .then(res => {
      const data = res.data
      commit('setAvator', data.avator)
      commit('setUserName', data.name)
      commit('setUserId', data.user_id)
      commit('setAccess', data.access)
      commit('setHasGetInfo', true)
    })
    .catch(err => {
      return err
    })
}

// 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
export function getUnreadMessageCount({ state, commit }) {
  return getUnreadCountApi().then(res => {
    const { data } = res
    commit('setMessageCount', data)
  })
}

// 获取消息列表，其中包含未读、已读、回收站三个列表
export function getMessageList({ state, commit }) {
  return getMessageApi()
    .then(res => {
      const { unread, readed, trash } = res.data
      commit(
        'setMessageUnreadList',
        unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
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
    })
    .catch(error => {
      return error
    })
}

// 根据当前点击的消息的id获取内容
export function getContentByMsgId({ state, commit }, { msg_id }) {
  let contentItem = state.messageContentStore[msg_id]
  if (contentItem) {
    return contentItem
  } else {
    return getContentByMsgIdApi(msg_id).then(res => {
      const content = res.data
      commit('updateMessageContentStore', { msg_id, content })
      return content
    })
  }
}

// 把一个未读消息标记为已读
export function hasRead({ state, commit }, { msg_id }) {
  return hasReadApi(msg_id)
    .then(() => {
      commit('moveMsg', {
        from: 'messageUnreadList',
        to: 'messageReadedList',
        msg_id
      })
      commit('setMessageCount', state.unreadCount - 1)
    })
    .catch(error => {
      return error
    })
}

// 删除一个已读消息到回收站
export function removeReaded({ commit }, { msg_id }) {
  return removeReadedApi(msg_id)
    .then(() => {
      commit('moveMsg', {
        from: 'messageReadedList',
        to: 'messageTrashList',
        msg_id
      })
    })
    .catch(error => {
      return error
    })
}

// 还原一个已删除消息到已读消息
export function restoreTrash({ commit }, { msg_id }) {
  return restoreTrashApi(msg_id)
    .then(() => {
      commit('moveMsg', {
        from: 'messageTrashList',
        to: 'messageReadedList',
        msg_id
      })
    })
    .catch(error => {
      return error
    })
}
