import request from '@/utils/request'
import store from '@/store'
export * from './channel'
export * from './news'

/**
 * 登录
 * @param {String} mobile // 手机号
 * @param {String} code // 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

// 获取用户个人资料
export const UserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const UserProfileEdit = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
