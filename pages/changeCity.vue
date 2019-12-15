<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <Iselect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Iselect from '../components/changeCity/Iselect'
import Hot from '../components/changeCity/Hot'
import Category from '../components/changeCity/Category'
export default {
  components: {
    Iselect,
    Hot,
    Category
  }
}
</script>

<style scoped>

</style>
