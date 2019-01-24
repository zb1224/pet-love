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
import commodity_management from "../components/manage/shop/commodity_management";
import sales_statistics from "../components/manage/shop/sales_statistics";
import SubmitShopInfo from "../components/manage/shop/submitShopInfo";
import Service from "../components/manage/shop/shopService/Service.vue";
import ShopOrder from '../components/manage/shop/shopOrder/Dingdan.vue';





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
                    name:"users",
                    component: Users,
                },
                {
                    path: "/manage/platform/shop",
                    name:"shop",
                    component: Shop,
                },
                {
                    path: "/manage/platform/petMaster",
                    component: PetMaster,
                },
                {
                    path: "/manage/platform/supplier",
                    name:"supplier",
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
                    path: '/manage/shop/shopOrder',
                    component: ShopOrder,
                },
                {
                    path: "/manage/shop/commodity_management",
                    component: commodity_management,
                },
                {
                    path: '/manage/shop/service',
                    component: Service,
                },
                {
                    path: "/manage/shop/submitShopInfo",
                    component: SubmitShopInfo
                },
                {
                    path: "/manage/shop/sales_statistics",
                    component: sales_statistics
                }
            ]
        }
    ]
});