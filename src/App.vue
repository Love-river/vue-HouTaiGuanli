<template>
  <div id="app">
    <router-view class="el_home_card" v-if="$route.path === '/login' || $route.path === '/register'"></router-view>
    <el-container v-else>
      <el-header style="padding: 0;z-index: 99999">
        <nav-header></nav-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-left></nav-left>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavHeader from './components/navHeader/NavHeader'
  import NavLeft from './components/navLeft/NavLeft'

  export default {
    name: 'App',
    components: {
      NavHeader,
      NavLeft
    }
  }
</script>


<style lang="scss">
  @import "./styles/common";

  body, html {
    height: 100%;
    width: 100%;
    background: #F0F2F5;
  }

  .el-header {
    padding: 0;
  }
</style>
