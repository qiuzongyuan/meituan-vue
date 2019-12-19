<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="item in nav" :key="item.name" :class="[item.name,item.active ? 's-nav-active' : '']" @click="navSelect">
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <Item v-for="(item,idx) in list" :key="idx" :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from './Product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      defaultList: [],
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: false
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '评价最多',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  methods: {
    navSelect (e) {
      const el = e.target
      let i = 0
      this.nav.map((item) => {
        if (el.className.includes('s-nav-active')) { return false }
        if (item.name === el.className) {
          this.$set(this.nav, i, {
            name: item.name,
            txt: item.txt,
            active: true
          })
          if (item.name === 's-default') {
            this.List.sort((a, b) => b.type.length - a.type.length)
          }
          if (item.name === 's-price') {
            this.List.sort((a, b) => a.price - b.price)
          }
          if (item.name === 's-visit') {
            this.List.sort((a, b) => b.comment - a.comment)
          }
          if (item.name === 's-comment') {
            this.List.sort((a, b) => b.rate - a.rate)
          }
        } else {
          this.$set(this.nav, i, {
            name: item.name,
            txt: item.txt,
            active: false
          })
        }
        i++
      })
    }
  }
}
</script>
