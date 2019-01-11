import axios from "axios"

export default {
    namespaced: true,
    state: {
        shops: [],
        shop: {
            Location: {
                longitude: "",
                latitude: "",
            },
            city: [],
            users: {
                logTel:"",
            }
        },
        updataVisible: false,
        shopInput: {
            type: "",
            text: "",
        },
        shopsPagination: {
            curpage: 1,
            eachpage: 5
        },
        addShop: {},
        updataShop: {},
        shoper: {},
        unShops: [],
        unShopsPagination: {
          curpage: 1,
          eachpage: 5
        }
    },
    getters: {

    },
    mutations: {
        setShop(state, shop) {
            state.shop = shop
        },
        setShops(state, shops) {
            state.shops = shops
        },
        setPagination(state, shopsPagination) {
            state.shopsPagination = shopsPagination
        },
        setVisible(state, updataVisible) {
            state.updataVisible = updataVisible
        },
        setShopType(state, type) {
            state.stuInput = {
                ...state.stuInput, type
            }
        },
        setShopText(state, text) {
            state.stuInput = {
                ...state.stuInput, text
            }
        },
        setShopPage(state, page) {
            state.shopsPagination.curpage = page
        },
        setShopRows(state, rows) {
            state.shopsPagination.eachpage = rows
        },
        setLogTel(state, logTel) {

            state.shop.users.logTel = logTel
        },
        setShopUsers(state, users) {
            console.log(users)
            state.shop.users = users
        },
        setUnShops(state, unShops) {
            state.unShops= unShops
        },
        setUnShopsPagination(state, unShopsPagination) {
            state.unShopsPagination = unShopsPagination
        },
    },
    actions: {
        updataShopInfo({ commit }, id) {
            axios({
                method: "get",
                url: "/shop/" + id
            }).then(({ data }) => {
                console.log(data)
                commit("setShop", data)
            });
        },
        showUnShops({ state, commit }) {
            axios({
                methods: "get",
                url: "/shop",
                params: {
                    page: state.unShopsPagination.curpage,
                    rows: state.unShopsPagination.eachpage,
                    type: "status",
                    text: "0"
                }
            }).then(({ data }) => {
                console.log("456", data);
                commit("setUnShops", data.rows)
                commit("setUnShopsPagination", data)
            });
        },
        showShops({ state, commit }) {
            let page = state.shopsPagination.curpage
            let rows = state.shopsPagination.eachpage
            let type = state.shopInput.type
            let text = state.shopInput.text
            console.log(type, text)
            axios({
                method: "get",
                url: "/shop",
                params: {
                    page,
                    rows,
                    type: type || "status",
                    text: text || "1"
                }
            }).then(({ data }) => {
                console.log("Shop", data)
                commit("setShops", data.rows)
                commit("setPagination", data)
            });
        },
    }
}