<template>
  <div>
    <!-- 表头 -->
    <div class="navbar">
      <navBar :title="'个人信息'" />
    </div>

    <!-- 头像-->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>

    <!-- 内容 -->
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="ShowUpdateName = true"
    >
    </van-cell>
    <!-- 昵称弹出层 -->
    <van-popup v-model="ShowUpdateName" style="height: 100%" position="bottom">
      <nickname
        @close="ShowUpdateName = false"
        v-model="user.name"
        v-if="ShowUpdateName"
      />
    </van-popup>

    <van-cell
      title="性别"
      :value="user.gender ? '女' : '男'"
      is-link
      @click="isShowUpdateGender = true"
    ></van-cell>
    <!-- 性别弹出层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <gender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      />
    </van-popup>

    <van-cell
    title="生日"
    @click="isShowUpdateBirthdy = true"
    :value="user.birthdy || '1977-00-00'"
    is-link />
    <!-- 生日弹层 -->
    <van-popup
    v-model="isShowUpdateBirthdy"
    position="bottom">
      <date v-model="user.birthdy" @close="isShowUpdateBirthdy = false" />
    </van-popup>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import nickname from './components/nickname.vue'
import gender from './components/gender.vue'
import date from './components/date.vue'
import { UserProfile } from '@/api/user'
export default {
  data () {
    return {
      user: [],
      ShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false
    }
  },
  components: {
    navBar,
    nickname,
    gender,
    date
  },
  created () {
    this.UserProfile()
  },
  methods: {
    async UserProfile () {
      //获取数据
      // const res = await UserProfile()
      // console.log(res)
      try {
        const res = await UserProfile()
        this.user = res.data.data
      } catch (e) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.avatar {
  width: 60px;
  height: 60px;
}
</style>
