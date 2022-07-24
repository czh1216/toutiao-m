<template>
  <div>
    <!-- 头部 -->
    <header>
      <!-- 已登录 -->
      <div class="user-info banner" v-if="isShow">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="list.photo"
              />
              <span class="mobile">{{ list.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round @click="$router.push('/editdata')">编辑资料</van-button>
            </van-row>
          </van-col>
        </van-row>

        <van-grid :border="false" class="grid">
          <van-grid-item text="头条">
            <template #icon>{{ list.art_count }}</template>
          </van-grid-item>
          <van-grid-item text="粉丝">
              <template #icon>{{ list.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ list.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ list.like_count }}</template>
            </van-grid-item>
        </van-grid>
      </div>

      <!-- 未登录 -->
      <div class="login-register banner" v-else>
        <div class="wrap" @click="loginBtn">
          <img src="@/assets/mobile.png" alt="" class="mobile-img" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 内容 -->
    <main>
      <div>
        <!-- iconfont -->
        <van-grid :column-num="2" class="grid" :clickable="true">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史记录">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
        </van-grid>
      </div>

      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 退出按钮 -->
    <van-button v-if="isShow" block class="login-btn" @click="logbtn">退出按钮</van-button>
  </div>
</template>

<script>
import { users } from '@/API/user'
export default {
  data () {
    return {
      list: {} // 用户信息对象
    }
  },
  computed: {
    isShow () {
      // 两个感叹号转换为布尔值
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 退出登录
    logbtn () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', {})
          this.$toast('退出成功')
        })
        .catch(() => {})
    },
    // 登录按钮跳转
    loginBtn () {
      this.$router.push('/login')
    },
    // 获取用户信息
    async loginUser () {
      if (this.isShow) {
        try {
          const res = await users() // console.log(res)
          this.list = res.data.data
          // console.log(this.list)
        } catch (err) {
          this.$toast('请重新登录')
        }
      }
    }
  },
  // 调用用户信息请求函数
  created () {
    this.loginUser()
  }
}
</script>

<style scoped lang="less">
.my{
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 200px;
  background: url('@/assets/banner.png') no-repeat 0 0 / cover;
}
//用户信息
.user-info {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }
  .row-2{
    .van-col{
      height: 100%;
    }
  }
  .mobile{
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    font-size: .34667rem;
    color: #fff;
    :deep(.van-grid-item__text) {
      margin-top: .10667rem;
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;

      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
  .login-btn {
    :deep(.van-button__text) {
      color: red;
    }
  }
  .link{
    padding: 10px 0;
  }

}
.login-register{
    display: flex;
    justify-content: center;
    align-items: center;

    .wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      img {
        margin-bottom: 10px;
      }
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
</style>
