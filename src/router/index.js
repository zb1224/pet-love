import Vue from "vue";
import VueRouter from 'vue-router';

import login from "../components/login";
import Register from "../components/register";

import Manage from '../components/manage';
import Users from "../components/manage/users"
import Shop from "../components/manage/shop"
import PetMaster from "../components/manage/petMaster"
import Supplier from "../components/manage/supplier"

import SupplierInfo from "../components/supplierInfo";
import SupplierCom from '../components/supplierCom';

import shopOwner from "../components/shopOwner"
import SubmitShopInfo from "../components/submitShopInfo"
import commodity_management from "../components/commodity_management"
import sales_statistics from "../components/sales_statistics"

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
    },
 {
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
            path:"/manage/shopOwner",
            component:shopOwner,
        },
        {
            path:"/manage/commodity_management",
            component:commodity_management,
        },
        {
            path:"/manage/submitShopInfo",
            component:SubmitShopInfo
        },
        {
            path:"/manage/sales_statistics",
            component:sales_statistics
        }
    ]
    }]
});
