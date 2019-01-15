import Vue from "vue";
import VueRouter from 'vue-router';

import login from "../components/login";
import Register from "../components/register";

// 管理界面
import Manage from '../components/manage';

// 平台管理模板
import PetMaster from "../components/manage/platform/petMaster";
import Shop from "../components/manage/platform/shop";
import Supplier from "../components/manage/platform/supplier";
import Users from "../components/manage/platform/users";
import CityStatistics from "../components/manage/platform/platFormStatistics/cityStatistics";
import PlatFormMap from "../components/manage/platform/platFormStatistics/platFormMap";
import saleStatistics from '../components/manage/platform/platFormStatistics/saleStatistics';

// 供应商管理模板
import SupplierInfo from "../components/manage/suppliers/supplierInfo";
import SupplierCom from '../components/manage/suppliers/supplierCom';
import SupplierStat from '../components/manage/suppliers/supplierStat';


// 面店管理模板
import shopOrders from "../components/shopOrders";

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
<<<<<<< HEAD
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
=======
                path: "/manage/suppliers/supplierInfo",
                component: SupplierInfo,
            },
            {
                path: '/manage/suppliers/supplierCom',
                component: SupplierCom,
            },
            {
                path: '/manage/suppliers/supplierStat',
                component: SupplierStat,
            },
            {
                path: "/manage/platform/users",
                component: Users,
            },
            {
                path: "/manage/platform/shop",
                component: Shop,
            },
            {
                path: "/manage/platform/petMaster",
                component: PetMaster,
            },
            {
                path: "/manage/platform/supplier",
                component: Supplier,
            },
            {
                path: "/manage/platform/cityStatistics",
                component: CityStatistics,
            },
            {
                path: "/manage/platform/platFormMap",
                component: PlatFormMap,
            },
            {
                path: "/manage/platfrom/saleStatistics",
                component: saleStatistics,
            },
            {
                path: '/manage/shopOrders',
                component: shopOrders,
            }
        ]
>>>>>>> 03ba0573b9ad4e7e842f87c941adcca0c201e610
    }]
});