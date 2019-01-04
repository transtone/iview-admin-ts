import { mosaicMobile } from '@/utils'
import { isEmpty, findIndex, propEq, concat } from 'ramda'

export const token = state => state.login.token
export const user = state => {
  if (isEmpty(state.login.user)) {
    return ''
  } else {
    return mosaicMobile(state.login.user.Mobile.String)
  }
}

export const checkToken = state => {
  const token = state.login.token
  if (token === '') {
    return false
  } else {
    let jwtouttime
    try {
      jwtouttime = JSON.parse(atob(token.split('.')[1])).exp
    } catch (err) {
      jwtouttime = 0
    }
    return jwtouttime > Number(new Date()) / 1000
  }
}

export const checkAdmin = state => {
  return findIndex(propEq('Name', 'GetAdmins'))(state.login.permissions) !== -1
}

export const permissions = state => {
  const permission: any[] = []
  state.login.permissions.map(data => {
    permission.push(data.Name)
  })
  return permission
}

export const asideMenuConfig = state => {
  const noAuth = [
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   icon: 'el-icon-menu'
    // },
    {
      path: '/mp',
      name: '公号导入管理',
      icon: 'el-icon-news'
    },
    {
      path: '/datas',
      name: '数据管理',
      icon: 'el-icon-document'
    },
    {
      path: '/monitor',
      name: '文章监控',
      icon: 'el-icon-view'
    },
    {
      path: '/my',
      name: '个人中心',
      icon: 'el-icon-guanyuwomen'
    }
    // {
    //   path: '/developer',
    //   name: '开发者中心',
    //   icon: 'el-icon-guanyuwomen'
    // }
  ]
  let needAuth: any[] = []
  if (findIndex(propEq('Name', 'GetAdmins'))(state.login.permissions) !== -1) {
    needAuth = [
      {
        path: '/admin',
        name: '管理员控制台',
        icon: 'el-icon-setting',
        children: [
          {
            path: '/member',
            name: '客户管理'
          },
          {
            path: '/report',
            name: '每日报表'
          },
          {
            path: '/permission',
            name: '权限管理'
          },
          {
            path: '/usergroup',
            name: '用户组管理'
          },
          {
            path: '/developer',
            name: '开发者认证'
          },
          {
            path: '/docmenu',
            name: '文档菜单管理'
          },
          {
            path: '/config',
            name: '系统配置'
          }
        ]
      }
    ]
  }
  return concat(noAuth, needAuth)
}
