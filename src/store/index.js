import Vue from 'vue';
import Vuex from 'vuex';

// 胡寒冰
import userModules from "./modules/userModules";
import shopModules from "./modules/shopModules";
import petMasterModules from "./modules/petMasterModules";
import supplierModules from "./modules/supplierModules";
// 赵丽
import shopComModule from "./modules/shopComModule";
import shopOwnerModules from "./modules/shopOwnerModules";
// 陈坤
import shopOrderModule from "./shopOrderModule";
// 赵斌
import supplierComModule from './supplierComModule';

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