// export const phone = [
//   {
//     required: true,
//     message: '请填写手机号'
//     // trigger: 'blur'
//   },
//   {
//     pattern: /^1[3|5|7|8]\d{9}$/,
//     message: '请填写正确的手机号'
//     // trigger: 'onblur'
//   }
// ]
// export const code = [
//   {
//     required: true,
//     message: '请填写验证码'
//     // trigger: 'onblur'
//   },
//   {
//     pattern: /^\d{6}$/,
//     message: '请填写正确的验证码'
//     // trigger: 'blur'
//   }
// ]

export const mobileRules = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '手机号格式不正确'
  }
]

export const condeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /[0-9]{6}/, message: '请输入6位验证码' }
]
