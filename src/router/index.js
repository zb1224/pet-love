import Vue from "vue";
import VueRouter from 'vue-router';

import login from "../components/login";
import Register from "../components/register";

import Manage from '../components/manage';
import Users from "../components/manage/users"
import Shop from "../components/manage/shop"
import PetMaster from "../components/manage/petMaster"
import Supplier from "../components/manage/supplier"
import CityStatistics from "../components/manage/platFormStatistics/cityStatistics"
import PlatFormMap from "../components/manage/platFormStatistics/platFormMap"

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
        }, 
        {
            path: "/manage/users",
            component: Users,
        },
        {
            path: "/manage/shop",
            component: Shop,
        },
        {
            path: "/manage/petMaster",
            component: PetMaster,
        },
        {
            path: "/manage/supplier",
            component: Supplier,
        },
        {
            path: "/manage/cityStatistics",
            component: CityStatistics,
        },
        {
            path: "/manage/platFormMap",
            component: PlatFormMap,
        },
    ]
    }]
});
