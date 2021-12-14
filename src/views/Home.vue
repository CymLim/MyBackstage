<template>
  <el-container style="height: 100%">
    <el-aside width="auto"><Aside></Aside></el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
       <tag></tag>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
import Tag from "../components/Tag.vue";
export default {
  name: "Home",
  components: { Aside, Header,Tag },
};
</script>

<style lang="scss" scoped>
.el-header{
  background: #333;
}
.el-main{
  padding-top:0;
}
</style>

