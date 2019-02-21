import { isEmpty, findIndex, propEq, concat } from 'ramda'

export const token = state => state.user.token

export const checkToken = state => {
  const token = state.user.token
  if (token === '') {
    return false
  } else {
    return true
    // let jwtouttime
    // try {
    //   jwtouttime = JSON.parse(atob(token.split('.')[1])).exp
    // } catch (err) {
    //   jwtouttime = 0
    // }
    // return jwtouttime > Number(new Date()) / 1000
  }
}
