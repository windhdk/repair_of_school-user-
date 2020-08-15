import request from '@/utils/request'
import md5 from 'js-md5'

export function login(username, password, code) {
  password = md5(password)
  return request({
    url: '/user/user/login',
    method: 'post',
    data: {
      username,
      password,
      code
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/user/getInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/user/user/logout',
    method: 'post'
  })
}
