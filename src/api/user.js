import request from '@/utils/request'
/**
 * 登录注册接口
 * @param {*} mobile // 手机号
 * @param {*} code  // 验证码
 * @returns  // returns
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 * // 发送短信验证码接口
 * @param {*} mobile // 手机号
 * @returns //returns
 */
export const find = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

/**
 * // 获取用户信息
 * @returns //returns
 */
export const users = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}

/**
 * // 关注请求
 * @param {*} target //关注用户的id
 * @returns //returns
 */
export const attention = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * // 取消关注请求
 * @param {*} target //目标用户
 * @returns //returns
 */
export const unfollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * // 编辑用户个人资料
 * @param {*} data //个人资料
 * @returns //returns
 */
export const UserProfileEdit = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 获取用户个人资料
export const UserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

//编辑用户照片资料
export const uploadPhoto = (file) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: file
  })
}
