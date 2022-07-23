<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="conserve"
    />

    <van-field
      style="padding: 10px"
      v-model="importsd"
      autosize
      type="textarea"
      rows="2"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { UserProfileEdit } from '@/API/user'
export default {
  data () {
    return {
      message: this.value,
      importsd: ''
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  created () {
    this.importsd = this.value
    // this.conserve()
  },
  methods: {
    async conserve () {
      // const { data } = await UserProfileEdit()
      // console.log(data)
      this.$toast.loading({
        message: '保存中。。。',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.importsd.trim() === '') {
          return this.$toast('请输入昵称')
        }
        await UserProfileEdit({
          name: this.importsd
        })
        this.$emit('input', this.importsd)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
