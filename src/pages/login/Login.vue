<template>
  <div class="container el_input">
    <div class="form">
      <el-card style="width: 20%">
        <div slot="header" style="text-align: center">
          <h1>欢迎来到小爱后台管理系统</h1>
        </div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" label-position="left">
          <el-form-item label="请输入用户名" prop="username">
            <el-input v-model="form.username"  style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" prop="password" class="el_input_item">
            <el-input v-model="form.password"  style="width: 300px;" type="password"></el-input>
          </el-form-item>
          <el-form-item label="请输入验证码" prop="code">
            <div class="flex">
              <div>
                <el-input v-model="form.code" style="width: 140px;"></el-input>
              </div>
              <div class="captcha" @click="getCaptcha">
                <img src="api/captcha" alt="" ref="captcha" class="img">
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="flex" >
              <el-button type="primary" @click="login">立即登录</el-button>
              <el-button type="primary" style="margin-left:150px" @click="register">立即注册</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Login",
    components: {},
    props: {},
    data() {
      return {
        form: {
          username: '',
          password: '',
          code: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 10, message: '用户名最多为10位', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码最少为6位', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getCaptcha () {
        this.$refs.captcha.src = 'api/captcha?time=' + Date.now()
      },
      register () {
        this.$router.push('/register')
      },
      login () {
        this.$com.req('api/user/login', {
          username: this.form.username,
          password: this.form.password,
          code: this.form.code,
        }).then(response => {
          let res = response.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            localStorage.setItem('adminUser',JSON.stringify(res.data[0]))
            this.$router.push('/')
          }
          if (res.code === 1) {
            this.$message({
              type: 'error',
              message: '验证码不正确'
            })
            this.$refs.captcha.src = 'api/captcha?time=' + Date.now()
          }
          if (res.code === 500) {
            this.$message({
              type: 'error',
              message: '用户不存在,请检查后重新登录'
            })
            this.$refs.captcha.src = 'api/captcha?time=' + Date.now()
            this.form.code = ''
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
    /*.el-form {*/
      /*width: 30%;*/
    /*}*/
    /*.el-input {*/
      /*display: flex;*/
    /*}*/
  }
</style>
