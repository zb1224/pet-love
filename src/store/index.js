import Vue from 'vue'
import Vuex from 'vuex'
import supplierComModule from './supplierComModule';
import userModules from "./modules/userModules"
import shopModules from "./modules/shopModules"
import petMasterModules from "./modules/petMasterModules"
import supplierModules from "./modules/supplierModules"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        supplierComModule, userModules, shopModules, petMasterModules, supplierModules
    },
    state: {

    },
    mutations: {

    },
    actions: {


    }
})