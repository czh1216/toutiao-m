<template>
  <div>
    <h1>黑马头条</h1>
    <router-view></router-view>
    <p class="toutiao toutiao-yanzhengma"></p>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>

    <div class="bobo">权威</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bobo{
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
</style>
