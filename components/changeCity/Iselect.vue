<template>
  <div class="m-iselect">
    <span class="name" @click="querySearchAsync">
      按省份选择：
    </span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    直接搜索：
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      allCity: []
    }
  },
  watch: {
    async pvalue (newPvalue) {
      const { status, data: { city } } = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      } else {
        this.city = ''
      }
    }
  },
  async mounted () {
    const { status, data: { province } } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    async querySearchAsync (query, cb) {
      if (this.allCity.length) {
        cb(this.allCity.filter(item => item.value.includes(query) === true))
      } else {
        const { status, data: { city } } = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.allCity = city.map(item => ({ value: item.name }))
          cb(this.allCity.filter(item => item.value.includes(query) === true))
        } else {
          cb()
        }
      }
    },
    handleSelect (item) {
      console.log(item.value)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/changecity/iselect.scss";
</style>
