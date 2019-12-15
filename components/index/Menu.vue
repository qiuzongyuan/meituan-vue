<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index" @mouseenter="mouseenter">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <!---v-if控制显示分类-->
    <div v-if="kind" class="detail" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item,index) in curDetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span v-for="v in item.child" :key="v">
          {{ v }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '',
      menu: this.$store.state.home.menu
    }
  },
  computed: {
    curDetail () {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave () {
      // 鼠标离开取消显示，用kind 控制
      const self = this
      self._timer = setTimeout(() => {
        self.kind = ''
      }, 150)
    },
    mouseenter (e) {
      // 鼠标进入获取class名字，同时让item.type 等于 kind 模块显示
      this.kind = e.target.querySelector('i').className
    },
    sover () {
      // 如果进入取消清除 kind
      clearTimeout(this._timer)
    },
    sout () {
      // 离开后再清除
      this.kind = ''
    }
  }
}
</script>

<style>

</style>
