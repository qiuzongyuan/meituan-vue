<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd :class="{active:kind==='all'}" kind="all" keyword="景点">
        全部
      </dd>
      <dd :class="{active:kind==='part'}" kind="part" keyword="美食">
        约会聚餐
      </dd>
      <dd :class="{active:kind==='spa'}" kind="spa" keyword="spa">
        丽人SPA
      </dd>
      <dd :class="{active:kind==='movie'}" kind="movie" keyword="电影">
        电影演出
      </dd>
      <dd :class="{active:kind==='travel'}" kind="travel" keyword="旅游">
        品质出游
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in cur" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">
              {{ item.title }}
            </li>
            <li class="pos">
              <span>
                {{ item.pos }}
              </span>
            </li>
            <li class="price">
              ￥<em>{{ item.price }}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data () {
    return {
      kind: 'all',
      kinds: ['all', 'part', 'spa', 'movie', 'travel'],
      keywords: ['景点', '美食', 'SPA', '电影', '旅游'],
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur () {
      return this.list[this.kind]
    }
  },
  async mounted () {
    const city = this.$store.state.geo.position
    console.log(city)
    for (let i = 0; i < this.keywords.length; i++) {
      const { status, data: { count, pois } } = await this.$axios.get('/search/resultsByKeywords', {
        params: {
          city,
          keyword: this.keywords[i]
        }
      })
      if (status === 200 && count > 0) {
        const result = pois.filter(item => item.photos.length).map((item) => {
          return {
            title: item.name,
            pos: item.type.split(';')[0],
            price: item.biz_ext.cost || '暂无',
            img: item.photos[0].url,
            url: '//abc.com'
          }
        })
        this.list[this.kinds[i]] = result.slice(0, 9)
      }
    }
  },
  methods: {
    over (e) {
      const dom = e.target
      const tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
      }
    }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
