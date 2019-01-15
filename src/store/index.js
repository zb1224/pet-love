import Vue from 'vue';
import Vuex from 'vuex';


import userModules from "./modules/userModules";
import shopModules from "./modules/shopModules";
import petMasterModules from "./modules/petMasterModules";
import supplierModules from "./modules/supplierModules";
import supplierComModule from './supplierComModule';
<<<<<<< HEAD
import userModules from "./modules/userModules"
import shopModules from "./modules/shopModules"
import petMasterModules from "./modules/petMasterModules"
import supplierModules from "./modules/supplierModules"
import shopComModule from "./modules/shopComModule"
import shopOwnerModules from "./modules/shopOwnerModules"
=======
import shopOrderModule from "./shopOrderModule";
>>>>>>> 03ba0573b9ad4e7e842f87c941adcca0c201e610

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
<<<<<<< HEAD
        supplierComModule, userModules, shopModules, petMasterModules, supplierModules, shopComModule,shopOwnerModules
=======
        userModules,
        shopModules,
        petMasterModules,
        supplierModules,
        supplierComModule,
        shopOrderModule
>>>>>>> 03ba0573b9ad4e7e842f87c941adcca0c201e610
    },
    state: {

    },
    mutations: {

    },
    actions: {

    }
})