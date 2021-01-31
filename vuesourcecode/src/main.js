// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './krouter';
import store from './kstore'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //实例挂载到这里，是为了插件安装时可以注册实例
  store,
  components: { App },
  template: '<App/>'
})
