<template>
  <div>
    <!----------- 头部表单H ------------->
    <van-nav-bar class="info" title="标题" left-arrow @click-left="background">
      <template #left><van-icon name="cross" color="#fff" /></template>
    </van-nav-bar>
    <!----------- 头部表单S ------------->

    <!----------- 输入框H ------------->
    <van-form class="fine" ref="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        label
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        label
        placeholder="请输入验证码"
        :rules="condeRules"
      >
        <!-- 左边字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          ></van-count-down>
          <!-- 验证码图标 -->
          <van-button class="code-btn" size="mini" round @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!----------- 输入框S ------------->
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, condeRules } from './ruless.js'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      condeRules,
      mobileRules,
      isShowCountDown: false
    }
  },
  methods: {
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (e) {
        // this.$toast.fail('手机号非法!')
        if (!e.response) {
          this.$toast.fail('手机号非法!')
        } else {
          const status = e.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(e.response.data.message)
          }
        }
      }
    },
    async login () {
      this.$toast.loading({
        message: '不要急,正在加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log('登录成功', res)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/my')
        this.$toast.success('登录成功')
      } catch (e) {
        const status = e.response.status
        let message = '登录错误，请刷新！'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 返回之前的页面
    background () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.info {
  background-color: #3296fa;
  // color#fff
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.fine {
  :deep(.van-field__label) {
    width: 20px;
  }
  .toutiao {
    font-size: 35px;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
