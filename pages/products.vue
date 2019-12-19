<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs :keyword="keyword" />
      <Category :areas="areas" />
      <List :list="list" />
    </el-col>
    <el-col :span="5">
      <Amap :width="290" :height="230" :point="point" />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '../components/products/Crumbs'
import Category from '../components/products/Category'
import List from '../components/products/List'
import Amap from '../components/public/map/Map'
export default {
  components: {
    Crumbs,
    Category,
    List,
    Amap
  },
  async asyncData (ctx) {
    const keyword = ctx.query.keyword || '火锅'
    const city = ctx.store.state.geo.position
    const { status: status1, data: { count, pois } } = await ctx.$axios.get(`/search/resultsByKeywords`, {
      params: {
        keyword,
        city
      }
    })
    const { status: status2, data: { areas } } = await ctx.$axios.get(`/category/crumbs`, {
      params: {
        city
      }
    })
    if (status1 === 200 && count > 0 && status2 === 200) {
      return {
        list: pois.filter(item => item.photos.length).map((item) => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        point: pois.map(item => item.location).map(item => item.split(','))
      }
    }
  },
  data () {
    return {
      list: [],
      areas: [],
      keyword: '',
      point: []
    }
  },
  methods: {
    show () {
      console.log(this.point)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/products/index";
</style>
