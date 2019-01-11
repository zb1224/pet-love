import Vue from "vue"
import VueRouter from "vue-router"
import Manage from "../components/manage"
import Users from "../components/manage/users"
import Shop from "../components/manage/shop"
import PetMaster from "../components/manage/petMaster"
import Supplier from "../components/manage/supplier"
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            component: Manage
        },
        {
            path: "/manage",
            component: Manage,
            children: [
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
            ]
        },
    ]
})