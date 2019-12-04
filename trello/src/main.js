import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/reset.css'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
// 拦截器
Vue.prototype.$http.interceptors.request.use(function(config){
  // 从localStorage获取到token，添加到头部信息
  let token = localStorage.getItem('mytoken');
  if(token) {
    config.headers.withCredentials = true;
    config.headers.common['Authorization'] = 'Bearer ' + token;
  }
  return config;
})
// token过期，跳转到登录界面
Vue.prototype.$http.interceptors.response.use(response=>{
  return response
},err=>{
  if(err.response.status===401){
    router.push('/login');
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
