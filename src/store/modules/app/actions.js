import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import beforeClose from '@/router/before-close'
import { saveErrorLogger } from '@/api/data'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export function addErrorLog({ commit, rootState }, info) {
  if (!window.location.href.includes('error_logger_page'))
    commit('setHasReadErrorLoggerStatus', false)
  const {
    user: { token, userId, userName }
  } = rootState
  let data = {
    ...info,
    time: Date.parse(new Date()),
    token,
    userId,
    userName
  }
  saveErrorLogger(info).then(() => {
    commit('addError', data)
  })
}
