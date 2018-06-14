<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title-text">register </span><img class="logo" :src="require('../assets/logo.png')"></img>
      </div>
      <el-form status-icon ref="form" :rules="rules" :model="form">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="form.pass" placeholder="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="form.checkPass" placeholder="repeat password" auto-complete="off" @keyup.13.native="submit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: left" type="text" @click="login">login</el-button>
          <el-button style="float: right" type="primary" @click="submit">register</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="foot">© 2018 MEVN biotemplate</div>
  </section>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value !== '' && this.checkPass !== '') {
        this.$refs.form.validateField('checkPass')
      }
      callback()
    }

    var validatePass2 = (rule, value, callback) => {
      if (value !== '' && value !== this.form.pass) {
        callback(new Error('two passwords are not the same'))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        email: [
          {required: true, message: 'please fill in your email', trigger: 'blur'},
          {type: 'email', message: 'please use a valid email', trigger: 'blur'}
        ],
        pass: [
          {required: true, message: 'please fill in your password', trigger: 'blur'},
          {min: 8, max: 128, message: 'password must be longer than 8', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: 'please fill in your password', trigger: 'blur'},
          {min: 8, max: 128, message: 'password must be longer than 8', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http.post('apis/register', {username: this.form.email, password: this.form.pass}).then(response => {
            this.$router.push('/confirm/' + this.form.email)
          }, response => {
            let errMsg
            if (response.body.error === 'UserExistsError') {
              errMsg = 'this email is already registered, please login with it or register with another email'
            } else {
              errMsg = response.body.description
            }
            this.$message({
              showClose: false,
              message: errMsg,
              type: 'warning'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login () {
      this.$router.push('/login')
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
