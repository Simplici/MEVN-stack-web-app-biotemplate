<template>
  <div class="container">
  <div class="head">
    <img class="logo" :src="require('../assets/logo.png')"></img>
    <h2>MEVN biotemplate</h2>
  </div>
  <div class="content">
    <p><strong>a simple intro page</strong></p>
    <el-button type="text" @click="begin">begin</el-button>
  </div>
  <div class="foot">2018 MEVN biotemplate</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    begin () {
      this.$router.push('/workspace/profile')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  max-width: 860px;
  margin: 0 auto;
  padding: 0 20px;
}

.head{
  padding: 30px 0 0;
}

.content{
  padding: 20px 0;
}

.foot{
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  font-size: 14px;
  color: #ccc;
}

h1, h2{
  margin: 0;
}

.logo{
  width: 120px;
}

</style>
