import Vue from "vue";
import VueRouter from "vue-router";

import login from "../components/login/index.vue";
import Register from "../components/register/index.vue";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            component: login
        },
        {
            path: "/login",
            component: login
        }, {
            path: "/register",
            component: Register
        }
    ]
});