<template>
  <div @click="goArticleDetails(article.art_id)">
    <!-- 没有图片 -->
    <van-cell
    v-if="article.cover.type === 0"
    :title="article.title"
    :label="articleIndo"
    >
    </van-cell>

    <!-- 一张图片 -->
    <van-cell v-if="article.cover.type === 1" :title="article.title" :label="articleIndo">
      <van-image width="3rem" height="2rem" :src="article.cover.images[0]" />
    </van-cell>

    <!-- 三张图片 -->
    <van-cell v-if="article.cover.type === 3" :title="article.title">
      <template #label>
        <div>
          <van-image
          v-for="(img, index) in article.cover.images"
          :key="index"
          width="3rem"
          height="2rem"
          :src="img"
        />
        </div>
        <span>{{ articleIndo }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs.js'
export default {
  data () {
    return {
      dayjs
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    goArticleDetails (id) {
      this.$router.push('/articledetails/' + id)
    }
  },
  //底部信息
  computed: {
    articleIndo () {
      const data = this.article
      const relativeTime = dayjs(data.pubdate).fromNow()
      return `${data.aut_name} ${data.comm_count}评论 ${relativeTime}`
    }
  }
}
</script>

<style></style>
