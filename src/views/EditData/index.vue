<template>
  <div>
    <!-- 表头 -->
    <div class="navbar">
      <navBar :title="'个人信息'" />
    </div>

    <!-- 头像-->
    <input type="file" hidden ref="file" />
    <van-cell
      title="头像"
      is-link
      @click="$refs.file.click()"
      class="head-portrait"
    >
      <van-image class="avatar" fit="cover" round :src="!!imgUrl ? imgUrl : user.photo" />
    </van-cell>
    <!-- 头像弹出层 -->
    <headPortrait
      :photo="photo"
      v-if="isUpdatePhotoShow"
      @confirm="confirm"
      @noConfirm="noConfirm"
    />

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
      is-link
    />
    <!-- 生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <date v-model="user.birthday" @close="isShowUpdateBirthdy = false" />
    </van-popup>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import headPortrait from './components/headPortrait.vue'
import nickname from './components/nickname.vue'
import gender from './components/gender.vue'
import date from './components/date.vue'
import { UserProfile } from '@/API/user'
export default {
  data () {
    return {
      user: [],
      isUpdatePhotoShow: false,
      photo: '',
      ShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
      imgUrl: ''
    }
  },
  components: {
    navBar,
    nickname,
    gender,
    date,
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
    //更新头像
    confirm (img) {
      this.isUpdatePhotoShow = false
      this.imgUrl = img
    },
    noConfirm () {
      this.isUpdatePhotoShow = false
    }
  },

  mounted () {
    this.$refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.isUpdatePhotoShow = true
        this.$refs.file.value = ''
      }
    })
  }
}
</script>

<style scoped lang="less">
.avatar {
  width: 30px;
  height: 30px;
}
.head-portrait {
  // top: -130px;
  // z-index: 999;
  margin-top: 50px;
}
</style>
