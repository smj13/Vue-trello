import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[]
  },
  mutations: {
    getData(state,list){
      state.list = list;
    }
  },
  actions: {
    getData(context) {
      Vue.prototype.$http.get("http://localhost:5566/list").then(res=>{
        context.commit('getData',res.data);
      })
    },
    updateSort(context,data){
      // 更新排序
      Vue.prototype.$http.put("http://localhost:5566/updateSort",data);
    }
  }
})
