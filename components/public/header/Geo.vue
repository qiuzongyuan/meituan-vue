<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity">
      切换城市
    </nuxt-link>
    [
    <span v-for=" item in cities" :key="item" @click="changeCity(item + '市')">
      {{ item }}
    </span>
    ]
  </div>
</template>

<script>
export default {
  data () {
    return {
      cities: ['天津', '南京', '杭州']
    }
  },
  methods: {
    changeCity (city) {
      this.$store.commit('geo/setPosition', { city })
      location.href = '/'
    }
  }
}
</script>

<style scoped>
</style>
