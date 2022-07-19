<template>
  <div>
    <van-pull-refresh
    v-model="refreshLoading"
    @refresh="loadNextPage"
    success-text="刷新成功~"
    >
      <van-list
        @load="loadNextPage"
        offset="1"
        v-model="loading"
        :finished="isFinished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了~~"
      >
        <Articleltem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        >
        </Articleltem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/user'
import Articleltem from './Articleltem.vue'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      isFinished: false,
      loading: false,
      error: false,
      refreshLoading: false
    }
  },
  components: {
    Articleltem
  },
  created () {
    this.getArticleList()
  },
  methods: {
    //获取频道的文章并且处理文章数据
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // console.log(data)
        // 保存第一页页码
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (e) {
        //获取状态码
        const status = e.response.status
        if (status === 400) {
          throw new Error(e.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败,请重新刷新')
        }
      }
    },
    async loadNextPage () {
      try {
        // 测试刷新错误
        // if (Math.random() < 0.7) {
        //   throw new Error('错误')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        if (this.pre_timestamp !== data.data.pre_timestamp) {
          this.pre_timestamp = data.data.pre_timestamp
        }
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
