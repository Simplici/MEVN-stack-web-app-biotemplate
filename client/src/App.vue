<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body { height: 100%; margin: 0px; padding: 0px; }
h1{
  font-size: 1.5em;
  font-weight: 600;
  line-height: 1.2;
}
h2{
  font-size: 1.125em;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  line-height: 1.1;
}

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.card-operation-btn {
  float: right;
  padding: 3px 0;
}
</style>
