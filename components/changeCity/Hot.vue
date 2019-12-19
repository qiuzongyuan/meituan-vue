<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="(item,index) in list" :key="index" @click="to(item)">
        {{ item.name === '市辖区'? item.province : item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    const { status, data: { hots } } = await this.$axios.get('/geo/hotCity')
    if (status === 200) {
      this.list = hots
    }
  },
  methods: {
    to (item) {
      item.name = item.name === '市辖区' ? item.province : item.name
      this.$store.commit('geo/setPosition', { city: item.name })
      location.href = '/'
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/changecity/hot";
</style>
