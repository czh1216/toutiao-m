<template>
  <div>
    <!-- 表头 -->
    <div class="navbar">
      <navBar :title="'个人信息'" />
    </div>

    <!-- 头像-->
    <input type="file" hidden ref="file" @change="onFileChange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <!-- 头像弹出层 -->
    <van-popup
    v-model="isUpdatePhotoShow"
    style="height: 100%"
    position="bottom"
    >
    <headPortrait />
    </van-popup>

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
    :value="user.birthday || '1977-00-00'"
    is-link />
    <!-- 生日弹层 -->
    <van-popup
    v-model="isShowUpdateBirthdy"
    position="bottom">
      <date v-model="user.birthday" @close="isShowUpdateBirthdy = false" />
    </van-popup>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import headPortrait from './components/headPortrait.vue'
import nickname from './components/nickname.vue'
import gender from './components/gender.vue'
// import date from './components/date.vue'
import { UserProfile } from '@/API/user'
export default {
  data () {
    return {
      user: [],
      isUpdatePhotoShow: false,
      ShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false
    }
  },
  components: {
    navBar,
    nickname,
    gender,
    // date,
    headPortrait
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
    },
    //获取图片路径
    onFileChange () {
      const file = this.$refs.file.files[0]
      const imgFn = window.URL.createObjectURL(file)
      console.log(imgFn)
    },
    //上传图片
    inputChange () {
      const file = this.$refs.file.files[0]
      const imagUrl = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      console.log(imagUrl)
      console.log(22)
      // this.$refs.file.value = ''
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
