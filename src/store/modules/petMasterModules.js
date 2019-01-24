import axios from "axios"

export default {
    namespaced: true,
    state: {
        number: 0,
        petMasters: [],
        petMaster: {},
        updataVisible: false,
        petMasterInput: {
            type: "",
            text: "",
        },
        petMastersPagination: {
            curpage: 1,
            eachpage: 5
        },
        addPetMaster: {},
        updataPetMaster: {},
        unPetMaters: [],
        unPetMatersPagination: {
            curpage: 1,
            eachpage: 5
        }
    },
    getters: {

    },
    mutations: {
        setPetMaster(state, petMaster) {
            state.petMaster = petMaster
        },
        setPetMasters(state, petMasters) {
            state.petMasters = petMasters
        },
        setPetMastersPagination(state, petMastersPagination) {
            state.petMastersPagination = petMastersPagination
        },
        setVisible(state, updataVisible) {
            state.updataVisible = updataVisible
        },
        setPetMasterType(state, type) {
            state.petMasterInput = {
                ...state.petMasterInput, type
            }
        },
        setPetMasterText(state, text) {
            state.petMasterInput = {
                ...state.petMasterInput, text
            }
        },
        setPetMasterPage(state, page) {
            state.petMastersPagination.curpage = page
        },
        setPetMasterRows(state, rows) {
            state.petMastersPagination.eachpage = rows
        },
        setUnPetMaters(state, unPetMaters) {
            state.unPetMaters = unPetMaters
        },
        setUnPetMatersPagination(state, unPetMatersPagination) {
            state.unPetMatersPagination = unPetMatersPagination
        },
        setNumber(state, number) {
            state.number = number
        }
    },
    actions: {
        updataPetMasterInfo({ commit }, id) {
            axios({
                method: "get",
                url: "/petMaster/" + id
            }).then(({ data }) => {
                console.log(data)
                commit("setPetMaster", data)
            });
        },
        showUnPetMastersNum({commit}) {
            axios({
                methods: "get",
                url: "/petMaster/unpetMaster",
                params: {
                    type: "status",
                    text: "0"
                }
            }).then(({ data }) => {
                console.log("qwe", data.length)
                commit("setNumber", data.length)
            });
        },
        showUnPetMasters({ state, commit }) {
            axios({
                methods: "get",
                url: "/petMaster",
                params: {
                    page: state.unPetMatersPagination.curpage,
                    rows: state.unPetMatersPagination.eachpage,
                    type: "status",
                    text: "0"
                }
            }).then(({ data }) => {
                console.log("456", data);
                commit("setUnPetMaters", data.rows)
                commit("setUnPetMatersPagination", data)
            });
        },
        showPetMasters({ state, commit }) {
            let page = state.petMastersPagination.curpage
            let rows = state.petMastersPagination.eachpage
            let type = state.petMasterInput.type
            let text = state.petMasterInput.text
            console.log(type, text)
            axios({
                method: "get",
                url: "/petMaster",
                params: {
                    page,
                    rows,
                    type: type || "status",
                    text: text || "1"
                }
            }).then(({ data }) => {
                console.log("777", data)
                commit("setPetMasters", data.rows)
                commit("setPetMastersPagination", data)
            });
        },
    }
}