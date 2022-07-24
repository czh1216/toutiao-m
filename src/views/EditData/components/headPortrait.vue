<template>
  <div class="update-avatar">
    <img :src="img" />
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm">成功</span>
    </div>

    <van-popup
      v-model="isShowUpdateAvatar"
      style="height: 100%"
      position="bottom"
    >
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    // img: {
    //   type: [String, Object],
    //   required: true
    // }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel,
    .confirm {
      width: 45px;
      height: 45px;
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
