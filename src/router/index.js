import Vue from "vue";
import VueRouter from "vue-router";

import login from "../components/login/index.vue";
import Register from "../components/register/index.vue";
import Manage from "../components/manage/index.vue";

import Supplier from "../components/supplier/index.vue";
import SupplierInfo from "../components/supplier/supplierInfo/index.vue";

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
            }]
        }]
    }]
});