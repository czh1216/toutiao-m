<template>
  <div>
    <div class="update-birthdy">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script>
import { UserProfileEdit } from '@/api/user'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中。。。',
        forbidClick: true,
        duration: 0
      })
      try {
        await UserProfileEdit({
          birthdy: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
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
