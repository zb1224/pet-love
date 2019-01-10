import Vue from "vue";
import VueRouter from 'vue-router';

import login from "../components/login";
import Register from "../components/register";

import Manage from '../components/manage';

import Supplier from '../components/supplier';
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
            path: "/manage/supplier",
            component: Supplier,
            children: [{
                    path: "/manage/supplier/supplierInfo",
                    component: SupplierInfo
                },
                {
                    path: '/manage/supplier/supplierCom',
                    component: SupplierCom,
                },
            ]
        }]
    }]
});