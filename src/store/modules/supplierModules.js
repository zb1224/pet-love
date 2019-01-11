import axios from "axios"

export default {
    namespaced: true,
    state: {
        suppliers: [],
        supplier: {
            users:{
                Name:""
            }
        },
        updataVisible: false,
        supplierInput: {
            type: "",
            text: "",
        },
        suppliersPagination: {
            curpage: 1,
            eachpage: 5
        },
        addSupplier: {},
        updataSupplier: {},
    },
    getters: {

    },
    mutations: {
        setSupplier(state, supplier) {
            state.supplier = supplier
        },
        setSuppliers(state, suppliers) {
            state.suppliers = suppliers
        },
        setPagination(state, suppliersPagination) {
            state.suppliersPagination = suppliersPagination
        },
        setVisible(state, updataVisible) {
            state.updataVisible = updataVisible
        },
        setSupplierType(state, type) {
            state.supplierInput = {
                ...state.supplierInput, type
            }
        },
        setSupplierText(state, text) {
            state.supplierInput = {
                ...state.supplierInput, text
            }
        },
        setSupplierPage(state, page) {
            state.suppliersPagination.curpage = page
        },
        setSupplierRows(state, rows) {
            state.suppliersPagination.eachpage = rows
        },
    },
    actions: {
        updataSupplierInfo({ commit }, id) {
            axios({
                method: "get",
                url: "/supplier/" + id
            }).then(({ data }) => {
                console.log(data)
                commit("setSupplier", data)
            });
        },
        showSuppliers({ state, commit }) {
            let page = state.suppliersPagination.curpage
            let rows = state.suppliersPagination.eachpage
            let type = state.supplierInput.type
            let text = state.supplierInput.text
            console.log(type,text)
            axios({
                method: "get",
                url: "/supplier",
                params: {
                    page,
                    rows,
                    type: type || "status",
                    text: text || "1"
                }
            }).then(({ data }) => {
                console.log("111", data)
                commit("setSuppliers", data.rows)
                commit("setPagination", data)
            });
        },
    }
}