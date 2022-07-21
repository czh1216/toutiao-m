<template>
  <div>
    <van-cell title="暂无数据" v-if="!show" />
    <div v-if="show">
      <van-cell
        icon="search"
        v-for="(ele, index) in highlightList"
        :key="index"
        @click="addSearch(index)"
      >
        <template #title> <span v-html="ele" ref="ele"></span></template
      ></van-cell>
    </div>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  data () {
    return {
      show: true,
      list: []
    }
  },
  props: {
    SearchValue: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSearch () {
      if (this.SearchValue.trim() !== '') {
        try {
          const res = await getSearch(this.SearchValue)
          this.list = res.data.data.options.filter(Boolean)
          this.show = true
          if (this.list.length === 0) {
            this.show = false
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    addSearch (index) {
      const ele = this.$refs.ele[index].innerText
      this.$emit('addSearch', ele)
    }
  },
  watch: {
    SearchValue: {
      immediate: true,
      handler () {
        this.getSearch()
      }
    }
  },
  computed: {
    highlightList () {
      const reg = new RegExp(this.SearchValue, 'ig')
      return this.list.map((ele) =>
        ele.replace(reg, (item) => `<span style='color:red'>${item}</span>`)
      )
    }
  }
}
</script>

<style scoped>
.highlight {
  color: red;
}
</style>
