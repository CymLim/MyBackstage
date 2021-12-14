<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-show="!isCollapse">Backstage Management System</h3> 
    <h3 v-show="isCollapse">Backstage</h3> 
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.label"
      v-for="item in hasChildren"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "Home",
          icon: "s-home",
          url: "Home/Home"
        },
        {
          path: "/product",
          name: "product",
          label: "Commodity Management",
          icon: "present",
          url: "CommodityManagement/CommodityManagement"
        },
        {
          path: "/user",
          name: "user",
          label: "User Management",
          icon: "user",
          url: "UserManagement/UserManagement",
        },
        {
          path: "/setting",
          name: "setting",
          label: "Setting",
          icon: "setting",
          url: "Setting/Setting",
        },
        {
          label: "Others",
          icon: "s-grid",
          children: [
            {
              path: "/Calculator",
              name: "Calculator",
              label: "Calculator",
              icon: "menu",
              url: "Others/Calculator",
            },
            {
              path: "/TodoList",
              name: "TodoList",
              label: "TodoList",
              icon: "menu",
              url: "Others/TodoList",
            },
          ],
        },
      ],
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    clickMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu",item);
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children);
    },
    hasChildren() {
      return this.menu.filter(item => item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu{
  height: 100%;
  border:none;
  h3{
      color: #ffffff;
      text-align: center;
      line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}
</style>