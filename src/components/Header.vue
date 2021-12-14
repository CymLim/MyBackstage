<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-files">Profile</el-dropdown-item>
          <el-dropdown-item icon="el-icon-document">Document</el-dropdown-item>
          <el-dropdown-item icon="el-icon-message">Message</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button"
            >Log Out</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userImg: require("../assets/images/userImg.png")
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
 
  },
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
 
  &.el-breadcrumb__item:last-child,{
    .el-breadcrumb__inner {
      color: skyblue;
      
    }
  }
   &.el-breadcrumb__item:first-child{
         .el-breadcrumb__inner {
      color: skyblue;
    }
   }
}
</style>