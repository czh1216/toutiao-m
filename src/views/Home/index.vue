<template>
  <div>
    <!-- 顶部标题 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button @click="$router.push('/search')" round>
          <van-icon name="search" />搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 顶部导航 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="ele.name" :name="index" v-for="(ele, index) in channelList" :key="index">
        <ArticleList :id="ele.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <span class="iconfont icon-hanbaocaidan" slot="nav-right" @click="isShow"></span>

    <EditChannel
      ref="popup"
      :list="channelList"
      :active="active"
      @delChannel="delChannel"
      @cutChannel="cutChannel"
      @addChannel="addChannel"
    ></EditChannel>
  </div>
</template>

<script>
import EditChannel from '@/components/EditChannel'
import ArticleList from '@/components/ArticleList.vue'
import { getChannel, delChannel, addChannel } from '@/API/channel'
import { GetChannel, SetChannel } from '@/utils/auth'

export default {
  data () {
    return {
      active: 0,
      activeName: '',
      channelList: []
    }
  },
  computed: {
    user () {
      // 转换为布尔值
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getChannel()
  },
  methods: {
    async getChannel () {
      if (!this.user) {
        const channel = GetChannel()
        if (channel) {
          this.channelList = channel
        } else {
          const { data } = await getChannel()
          this.channelList = data.data.channels
        }
      } else {
        const { data } = await getChannel()
        this.channelList = data.data.channels
      }
      // console.log(this.channelList)
    },
    isShow () {
      // console.log(this.$refs.popup)
      this.$refs.popup.show = !this.$refs.show
    },
    // 删除
    async delChannel (id) {
      this.channelList = this.channelList.filter((ele) => ele.id !== id)
      if (!this.user) {
        SetChannel(this.channelList)
        this.$toast('删除成功')
      } else {
        try {
          await delChannel(id)
          this.$toast('删除成功')
        } catch (err) {
          this.$toast('删除失败')
        }
      }
    },
    // 切换
    cutChannel (index) {
      this.active = index
    },
    // 添加
    async addChannel (ele) {
      this.channelList.push(ele)
      if (!this.user) {
        SetChannel(this.channelList)
        this.$toast('添加成功')
      } else {
        try {
          await addChannel(ele.id, this.channelList.length)
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
        }
      }
    }
  },
  components: {
    ArticleList,
    EditChannel
  }
}
</script>

<style lang="less" scoped>
// 头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 33px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 100px;
      height: 41px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 15px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}

/* 字体图标 */
.icon-hanbaocaidan {
  position: absolute;
  top: 46px;
  right: 0;
  width: 33px;
  height: 41px;
  font-size: 20px;
  z-index: 999;
  line-height: 41px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #fff;
  background-color: #fff;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    // background-image: url('~@/assets/images/gradient-gray-line.png');
    background-image: url('~@/assets/gradient-gray-line.png')
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 46px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 46px;
}

:deep(.van-tabs__content) {
  max-height: calc(150vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
