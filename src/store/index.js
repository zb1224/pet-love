import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import userModules from "./modules/userModules"
import shopModules from "./modules/shopModules"
import petMasterModules from "./modules/petMasterModules"
import supplierModules from "./modules/supplierModules"
supplierModules
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        userModules,shopModules,petMasterModules,supplierModules
    },
    state: {
      
    },
    getters: {

    },
    mutations: {
       
    },
    actions: {
       
    }
})