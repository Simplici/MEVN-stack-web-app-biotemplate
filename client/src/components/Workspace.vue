<template>
  <el-container>
    <el-aside>
      <el-menu
      router
      :default-active=$route.fullPath
      background-color="#f5f5f5"
      active-text-color="#ff0000"
      text-color="#111111">
        <img class="logo" :src="require('../assets/logo.png')"></img>
        <el-menu-item index="/workspace/profile">
          <icon name="user-circle" class="navigation-icon"></icon>
          {{ username }}
        </el-menu-item>
        <el-menu-item index="/workspace/contact">
          <icon name="envelope" class="navigation-icon"></icon>
          contact us
        </el-menu-item>
      </el-menu>
      <p id="build-with-love">build with <icon id="heart-icon" name="heart"></icon> by Hao XU</p>
    </el-aside>
    <el-main>
      <router-view>
      </router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      me: {email: ''}
    }
  },
  created: function () {
    this.$http.get('apis/users/me').then(response => {
      this.me = response.body
    })
  },
  computed: {
    username: function () {
      return this.me.email.split('@')[0]
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
  width: 240px !important;
}
.el-container, .el-aside, .el-menu {
  height: 100%;
}
.navigation-icon{
  margin-right: 10px;
}
#build-with-love{
  position: fixed;
  bottom: 0;
  font-size: 12px;
  width: 240px;
  text-align: center;
  margin-bottom: 5px;
  color: #ccc;
}
#heart-icon{
  width: 9px;
  height: 9px;
  color: #ff0000;
}

.logo{
  width: 120px;
  padding-top: 20px;
  padding-left: 20px;
}
</style>
