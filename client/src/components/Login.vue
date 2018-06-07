<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title-text">login </span><img class="logo" :src="require('../assets/logo.png')"></img>
      </div>
      <el-form status-icon ref="form" :rules="rules" :model="form">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="form.pass" placeholder="password" auto-complete="off" @keyup.13.native="submit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: left" type="text" @click="register">register</el-button>
          <el-button style="float: right" type="primary" @click="submit">login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="foot">© 2018 MEVN biotemplate</div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          {required: true, message: 'please fill in your email', trigger: 'blur'},
          {type: 'email', message: 'please use a valid email', trigger: 'blur'}
        ],
        pass: [
          {required: true, message: 'please fill in your password', trigger: 'blur'},
          {min: 8, max: 128, message: 'password must be longer than 8', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http.post('apis/login', {username: this.form.email, password: this.form.pass}).then(response => {
            this.$router.push('/workspace/profile')
          }, response => {
            this.$message({
              showClose: false,
              message: 'login failed, please check your email and password',
              type: 'warning'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.box-card {
  /* center horizontally and vertically the login card */
  width: 450px;
  height: 500px;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.foot{
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  color: #ccc;
}

.title-text {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    font-size: 18px;
}

.logo{
  height: 18px;
  vertical-align: middle;
}
</style>
