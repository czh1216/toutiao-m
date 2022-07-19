<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <!-- 我的频道 -->
        <div class="my-channel">
          <!-- 我的频道标题 -->
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
            >
              {{ isEdit ? '完成' : '编辑' }}
            </van-button>
          </van-cell>

          <!-- 我的频道 -->
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              v-for="(item, index) in myChannels"
              :key="item.id"
              :text="item.name"
              :class="{ 'active-channel': item.name === '推荐' }"
              @click="onClickMyChannel(item, index)"
            >
              <template #icon>
                <van-icon
                  name="cross"
                  v-show="isEdit && item.name !== '推荐'"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </div>

        <!-- 推荐频道 -->
        <div class="recommend-channel">
          <!-- 推荐频道标题 -->
          <van-cell title="推荐频道"></van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              v-for="item in recommend"
              :key="item.id"
              :text="item.name"
              icon="plus"
              @click="addMyChannel(item)"
            >
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    //点击我的频道
    onClickMyChannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        //删除
        this.$emit('del-mychanel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel (myChannels) {
      this.$emit('add-mychannel', { ...myChannels })
    }
  },
  computed: {
    recommend () {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: #FF69B4;
  }
}
.popupMain {
  padding-top: 100px;

  //按钮样式
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }

  //我的频道样式
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          //   line-height: 0.32rem;
          z-index: 100;
        }
        .van-icon {
          font-size: 12px;
        }
      }
    }
  }

  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
