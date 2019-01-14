import axios from 'axios';

export default {
    namespaced: true,
    state: {
        updateVisible: false,
        supplierCom: {},
        supplierComs: [],
        input: {
            type: "",
            text: ""
        },
        pagination: {
            curpage: 1,
            eachpage: 5
        },
        usersId: "",
        supplierId: ""
    },
    mutations: {
        setUpdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible;
        },
        setSupplierCom(state, supplierCom) {
            state.supplierCom = supplierCom;
        },
        setSupplierComs(state, supplierComs) {
            state.supplierComs = supplierComs;
        },
        // setType(state, type) {
        //     state.input = {
        //         type,
        //         ...state.input
        //     }
        // },
        // setText(state, text) {
        //     state.input = {
        //         text,
        //         ...state.input
        //     }
        // },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        // setPage(state, page) {
        //     state.pagination.curpage = page
        // },
        // setRows(state, rows) {
        //     state.pagination.eachpage = rows
        // },
        setProductBigImg(state, productBigImg) {
            state.supplierCom = {
                ...state.supplierCom, productBigImg
            }
        },
        setUsersId(state, usersId) {
            state.usersId = usersId
        },
        setSupplierId(state, supplierId) {
            state.supplierId = supplierId
        }
    },
    actions: {
        setCommodity({ commit }, id) {
            axios({
                methos: "get",
                url: "/supplierCom/" + id
            }).then(({ data }) => {
                commit('setSupplierCom', data)
            })
        },
        show({ state, commit }) {
            let type = state.input.type;
            let text = state.input.text;
            let page = state.pagination.curpage;
            let rows = state.pagination.eachpage;
            console.log("供应商ID", state.supplierId)
            axios({
                method: "get",
                url: "/supplierCom",
                params: {
                    supplierId: state.supplierId,
                    page,
                    rows,
                    type,
                    text
                }
            }).then(({ data }) => {
                console.log("data是", data)
                commit('setSupplierComs', data.rows);
                commit('setPagination', data);
            });
        },
        getSession({ commit, state, dispatch }) {
            axios({
                method: "get",
                url: "/index/getSession"
            }).then(({ data }) => {
                commit("setUsersId", data._id);
                console.log("登录的用户信息", data)
                axios({
                    method: "get",
                    url: "/suppliers",
                    params: {
                        usersId: data._id
                    }
                }).then(({ data }) => {
                    commit("setSupplierId", data[0]._id);
                    console.log("供应商信息", data)
                    console.log("this.state.supplierId", state.supplierId);
                    dispatch('show');
                })
            });
        }
    }
}