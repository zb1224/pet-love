import Vue from 'vue';
import Vuex from 'vuex';


import userModules from "./modules/userModules";
import shopModules from "./modules/shopModules";
import petMasterModules from "./modules/petMasterModules";
import supplierModules from "./modules/supplierModules";
import supplierComModule from './supplierComModule';
import shopOrderModule from "./shopOrderModule";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userModules,
        shopModules,
        petMasterModules,
        supplierModules,
        supplierComModule,
        shopOrderModule
    },
    state: {

    },
    mutations: {

    },
    actions: {

    }
})