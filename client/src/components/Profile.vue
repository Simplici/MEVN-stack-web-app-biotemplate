<template>
  <section>
    <el-card class="box-card item">
      <div slot="header" class="clearfix">
        <span>account information</span>
        <el-button  class="card-operation-btn" id="logout-btn" type="text" @click="dialogConfirmLogout = true">logout</el-button>
      </div>
      <span class="text">email： {{ me.email }}</span>
    </el-card>

    <el-dialog
      :visible.sync="dialogConfirmLogout"
      width="30%">
      <span>are your sure to logout?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmLogout = false">cancel</el-button>
        <el-button type="danger" @click="logout">yes</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
      me: {
        email: ''
      },
      dialogConfirmLogout: false
    }
  },
  methods: {
    logout: function () {
      this.$http.get('apis/logout').then(response => {
        this.$router.push('/login')
      })
    }
  },
  created: function () {
    this.$http.get('apis/users/me').then(response => {
      this.me = response.body
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logout-btn{
color: #FA5555;
}
</style>
