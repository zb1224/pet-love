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
        }
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
        }
    },
    actions: {
        setCommodity({ commit }, id) {
            axios({
                methos: "get",
                url: "/supplierCom/" + id
            }).then(({ data }) => {
                // console.log("商品个体",data);
                commit('setSupplierCom', data)
            })
        },
        show({ state, commit }) {
            let type = state.input.type;
            let text = state.input.text;
            let page = state.pagination.curpage;
            let rows = state.pagination.eachpage;
            axios({
                method: "get",
                url: "/supplierCom",
                params: {
                    page,
                    rows,
                    type,
                    text
                }
            }).then(({ data }) => {
                commit('setSupplierComs', data.rows);
                commit('setPagination', data);
            });
        }
    }
}