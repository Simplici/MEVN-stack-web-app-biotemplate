<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title-text">confirm email</span><img class="logo" :src="require('../assets/logo.png')"></img>
      </div>
      <el-form status-icon ref="form" :rules="rules" :model="form">
        <el-form-item prop="code">
          <el-input type="number" v-model="form.code" placeholder="please input the code in the confirmation email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: left" type="text" @click="register">register</el-button>
          <el-button style="float: right" type="primary" @click="submit">confirm</el-button>
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
        code: ''
      },
      rules: {
        code: [
          {required: true, message: 'please fill in the confirmation code', trigger: 'blur'},
          {min: 4, max: 4, message: 'the confirmation code is 4 digits', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http.post('apis/confirm', {email: this.$route.params.email, code: this.form.code}).then(response => {
            this.$router.push('/login')
          }, response => {
            this.$message({
              showClose: false,
              message: 'confirmation failed, please check the confirmation code',
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
