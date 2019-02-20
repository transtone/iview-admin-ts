import fetch from '@/libs/fetch'

export function getUsers(formData: object) {
  return fetch({
    url: '/user/',
    method: 'get',
    params: formData
  })
}

export function login(formData: object) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: formData
  })
}

export function changePassword(formData: object) {
  return fetch({
    url: '/user/password',
    method: 'put',
    data: formData
  })
}

export function register(formData: object) {
  return fetch({
    url: '/user/register',
    method: 'post',
    data: formData
  })
}

export function getGroups() {
  return fetch({
    url: `/group/`,
    method: 'get'
  })
}

export function getUserGroup(userid: string) {
  return fetch({
    url: `/usergroup/${userid}`,
    method: 'get'
  })
}

export function updateUserGroup(userid: string, formData: object) {
  return fetch({
    url: `/usergroup/${userid}`,
    method: 'put',
    data: formData
  })
}

export function addUserToGroup(userid: string, group: string) {
  return fetch({
    url: `/usergroup/${userid}`,
    method: 'post',
    data: { group }
  })
}

export function delUserFromGroup(userid: string, group: string) {
  return fetch({
    url: `/usergroup/${userid}/${group}`,
    method: 'delete'
  })
}
