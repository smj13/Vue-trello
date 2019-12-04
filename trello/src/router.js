import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: ()=>import('./views/Login')
    },
    {
      path: '/register',
      component: ()=>import('./views/Register')
    },
    {
      path: '/trello',
      component: ()=>import('./views/Trello')
    }
  ]
})