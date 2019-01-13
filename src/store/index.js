import Vue from 'vue'
import Vuex from 'vuex'
import supplierComModule from './supplierComModule';
import shopOrderModule from "./shopOrderModule";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
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