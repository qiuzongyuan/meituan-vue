<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <Menu />
      </el-col>
      <el-col :span="19">
        <Life />
      </el-col>
    </el-row>
    <el-row :span="24">
      <Artistic />
    </el-row>
  </div>
</template>

<script>
import Menu from '../components/index/Menu'
import Life from '../components/index/Life'
import Artistic from '../components/index/Artistic'
export default {
  components: {
    Life,
    Menu,
    Artistic
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>
