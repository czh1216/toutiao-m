<template>
  <div>
    <form action="/">
      <van-search
        v-model="SearchValue"
        show-action
        background="#50a3f6"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        class="search"
      />
    </form>
    <component
      :is="componentsName"
      :SearchValue="SearchValue"
      @addSearch="addSearch"
    ></component>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion'
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
export default {
  data () {
    return {
      SearchValue: '', // 搜索框的值
      SearchComponentsName: false // 判断是否显示搜索结果
    }
  },
  methods: {
    onSearch () {
      this.SearchComponentsName = true
      this.$store.state.history.push(this.SearchValue)
      // console.log(res)
      if (this.$store.state.history !== -1 && this.SearchValue.trim() !== '') {
        this.$store.state.history.splice(this.$store.state.history, 1)
        this.$store.commit('getHistorys', this.SearchValue)
      } else {
        this.$store.commit('getHistorys', this.SearchValue)
      }
    },
    onCancel () {
      this.$router.back()
    },
    onFocus () {
      this.SearchComponentsName = false
    },
    addSearch (ele) {
      this.SearchValue = ele
      this.onSearch()
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentsName () {
      if (this.SearchValue.trim() === '') {
        return 'SearchHistory'
      }
      if (this.SearchComponentsName) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
.search {
  :deep(.van-search__action) {
    color: #fff;
  }
}
</style>
