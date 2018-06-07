// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import resource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Icon from 'vue-awesome/components/Icon'

// import icons
import 'vue-awesome/icons/user-circle'
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/heart'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(resource)

Vue.component('icon', Icon)

/* if received 401 response, redirect to login page */
Vue.http.interceptors.push(function (request, next) {
  next(function (response) {
    if (response.status === 401) {
      router.push('/login')
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
