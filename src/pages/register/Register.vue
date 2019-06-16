<template>
  <div class="container el_input">
    <div class="form">
      <el-card style="width: 20%">
        <div slot="header" style="text-align: center">
          <h1>欢迎来到小爱后台管理系统</h1>
        </div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
          <el-form-item label="请输入用户名" prop="username" style="width: 100px !important;">
            <el-input v-model="form.username"  style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" prop="password" class="el_input_item">
            <el-input v-model="form.password"  style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex" style="justify-content: space-between">
              <el-button type="primary"  @click="register">立即注册</el-button>
              <el-button type="primary" style="position: relative;left: 80px" @click="$router.push('/login')">立即登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Register",
    components: {},
    props: {},
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 10, message: '用户名最多为10位', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码最少为6位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      register () {
        this.$com.req('api/user/register', {
          username: this.form.username,
          password: this.form.password
        }).then(response => {
          let res = response.data
          if (res.code === 1) {
            this.$message({
              type: 'error',
              message: '用户已存在'
            })
            this.form.username = ''
            this.form.password = ''
            return
          }
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '注册成功'
            })
            this.$router.push('/login')
          }
          if (res.code === 500) {
            this.$message({
              type: 'error',
              message: '服务器出错啦'
            })
            return
          }
        })
      }
    },
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../../assets/image/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .flex {
      display: flex;
      align-items: center;
    }
    .form {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .captcha {
        width: 80px;
        height: 60px;
        margin-left: 30px;
        cursor: pointer;
        .img {
          display: block;
          height: 100%;
        }
      }
    }
    .el-form {
      width: 30%;
    }

  }
</style>
