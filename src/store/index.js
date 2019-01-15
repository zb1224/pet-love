import Vue from 'vue';
import Vuex from 'vuex';


import userModules from "./modules/userModules";
import shopModules from "./modules/shopModules";
import petMasterModules from "./modules/petMasterModules";
import supplierModules from "./modules/supplierModules";
import supplierComModule from './supplierComModule';
import userModules from "./modules/userModules"
import shopModules from "./modules/shopModules"
import petMasterModules from "./modules/petMasterModules"
import supplierModules from "./modules/supplierModules"
import shopComModule from "./modules/shopComModule"
import shopOwnerModules from "./modules/shopOwnerModules"
import shopOrderModule from "./shopOrderModule";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        shopComModule,
        shopOwnerModules,
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