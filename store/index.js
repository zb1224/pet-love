import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)

export default new Vuex.Store({
    namespaced:true,
   state:{
       pagination:{},
       input: {
        type: "",
        text: ""
    },
   },
   mutations:{
     pagination(state,pagination){
         state.pagination=pagination;
     }
   },
  actions:{
    show({commit},payload={page : 1, rows:5}) {            
        axios({
        method: "get",
        url: "/shop",
        params: payload
      }).then((response) => {
        let data = response.data;      
        commit("Pagination",data)
      });
    }
  }

})