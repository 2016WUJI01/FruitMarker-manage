<template>
  <div class="layout">
    <el-container style="height: 750px; border: 1px solid #eee">
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246)"
      >
        <el-menu
          :default-openeds="['1']"
          :default-active="$router.path"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-home"></i> <span>首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template
              slot="title"
              class="title"
            ><i class="el-icon-home"></i><span>数据管理</span></template>
            <el-menu-item-group>
              <el-menu-item index="/buy"><span>进货表</span></el-menu-item>
              <el-menu-item index="/employee">员工列表</el-menu-item>
              <el-menu-item index="/fruit">水果表</el-menu-item>
              <el-menu-item index="/member">会员表</el-menu-item>
              <el-menu-item index="/sell">销售表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template
              slot="title"
              class="title"
            ><i class="el-icon-home"></i><span>管理员管理</span></template>
            <el-menu-item-group>
              <el-menu-item index="/user">管理员表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 18px">
          <el-container></el-container>
          <el-row>
            <el-col :span="12">
              <div><span>水果超市管理系统</span></div>
            </el-col>

            <el-col :span="12">
              <div>
                <el-dropdown @command="handleCommand">
                  <i
                    class="el-icon-setting"
                    style="margin-right: 15px"
                  ></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="quit">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span>账号</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <span>Sometimes Naive</span><br />
          <i class="el-icon-share"><a href="https://github.com/2016WUJI01">https://github.com/2016WUJI01</a></i>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
