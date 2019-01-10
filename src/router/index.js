import Vue from "vue";
import VueRouter from 'vue-router';

import login from "../components/login";
import Register from "../components/register";

import Manage from '../components/manage';

import SupplierInfo from "../components/supplierInfo";
import SupplierCom from '../components/supplierCom';

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        component: login
    }, {
        path: "/login",
        component: login
    }, {
        path: "/register",
        component: Register
    }, {
        path: "/manage",
        component: Manage,
        children: [{
            path: "/manage/supplierInfo",
            component: SupplierInfo,
        }, {
            path: '/manage/supplierCom',
            component: SupplierCom,
        }, ]
    }]
});