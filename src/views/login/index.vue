<template>
  <div>
    <!----------- 头部表单H ------------->
      <van-nav-bar class="info" title="标题" left-arrow @click-left="background">
      <template #left><van-icon name="cross" color="#fff" /></template>
      </van-nav-bar>
    <!----------- 头部表单S ------------->

    <!----------- 输入框H ------------->
      <van-form class="fine" @submit="login">
        <van-field
          v-model="mobile"
          name="手机号"
          label
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]">
          <template #label>
              <span class="toutiao toutiao-shouji"></span>
          </template>
        </van-field>
        <van-field
          v-model="code"
          name="验证码"
          label
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]">
          <template #label>
              <span class="toutiao toutiao-yanzhengma"></span>
          </template>
          <template #right-icon>
            <van-button class="code-btn" size="mini" round>发送验证码</van-button>
          </template>
        </van-field>
          <div style="margin: 16px;">
            <van-button block type="info" native-type="submit">登录</van-button>
          </div>
    </van-form>
    <!----------- 输入框S ------------->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    async login () {
      const res = await login(this.mobile, this.code)
      console.log('登录成功', res)
    },
    background () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.info{
    background-color:#3296FA;
    // color#fff
    :deep(.van-nav-bar__title){
        color:#fff
    }
}
.fine{
    :deep(.van-field__label){
      width: 20px;
    }
  .toutiao{
      font-size: 35px;
    }
  .code-btn{
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>