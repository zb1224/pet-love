import Vue from "vue";
import VueRouter from 'vue-router';
import Manage from '../components/manage';
import Supplier from '../components/supplier';
import SupplierCom from '../components/supplierCom';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/manage',
            component: Manage,
            children: [
                {
                    path: '/manage/supplier',
                    component: Supplier
                },
                {
                    path: '/manage/supplierCom',
                    component: SupplierCom,
                },
            //     {
            //         path: '/manage/teachers',
            //         component: Teachers,
            //     }
            ]
        }
    ]

});