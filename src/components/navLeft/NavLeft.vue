<template>
  <div class="leftNav">
    <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            background-color="#344055"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="selectMenu">
      <el-menu-item index="1" @click="goTo('/')">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goTo('/table')">
        <i class="el-icon-menu"></i>
        <span slot="title">分页表格</span>
      </el-menu-item>
      <el-menu-item index="3" @click="goTo('/tag')">
        <i class="el-icon-document"></i>
        <span slot="title">标签页</span>
      </el-menu-item>
      <el-menu-item index="4" @click="goTo('/upload')">
        <i class="el-icon-check"></i>
        <span slot="title">图片上传</span>
      </el-menu-item>
      <el-menu-item index="5" @click="goTo('/markdown')">
        <i class="el-icon-message"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="6" @click="goTo('/excel')">
        <i class="el-icon-setting" ></i>
        <span slot="title">导出excel</span>
      </el-menu-item>
      <el-menu-item index="7" @click="goTo('/logout')">
        <i class="el-icon-delete"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'NavLeft',
    components: {

    },
    data() {
      return {
        activeIndex: '1',
      }
    },
    methods: {
      selectMenu (index, indexPath) {
        this.activeIndex = index
      },
      goTo (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="scss">
  .leftNav {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 60px;
    display: flex;
    flex-direction: column;
    width: 200px;
    background: #344055;
    color: #fff;
  }
</style>
