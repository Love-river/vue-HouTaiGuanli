<template>
  <div class="logout">
    <div class="container">
      <div class="title">
        期待您的下次光临
      </div>
      <div class="btn">
        <div class="no">
          <el-button type="primary" @click="exit">确定退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logout',
    data() {
      return {}
    },
    methods: {
      exit () {
        this.$com.req('api/user/logout').then(response => {
          let res = response.data
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '期待您的下次光临'
            })
            localStorage.removeItem('adminUser')
            this.$router.push('/login')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .logout {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin-top: 140px;
      .title {
        width: 100%;
        text-align: center;
        font-size: 22px;
        font-weight: 700;
      }
      .btn {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        div {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
</style>
