import axios from "axios"
export default {
    namespaced: true,
    state: {
        shop: [],
        singleShop: {
            shopName: "",
            LicenseNumber: "",
            LicenseiImg: "",
            addr: "",
            Location: {
                longitude: "",
                latitude: ""
            },
            city: "",
            legalPerson: "",
            Tel: "",
            indexImg: "",
            characteristic: "",
            VIPLeve: "",
            Commission: "",
            status: "1",
            Employee: [
                {
                    name: "",
                    job: "",
                    tel: ""
                }
            ]
        }

    },
    getters: {},
    mutations: {
        setShop(state, shop) {
            state.shop = shop;
        },
        setSingleShop(state, singleShop) {
            state.singleShop = singleShop;
        },
        setClerkName(state, name) {
            state.singleShop.Employee.name = name
        },
        setClerkJob(state, job) {
            state.singleShop.Employee.job = job
        },
        setClerkTel(state, tel) {
            state.singleShop.Employee.tel = tel
        }
    },
    actions: {
        setSingleShop({ commit }, id) {
            axios({
                method: "get",
                url: "/shop/" + id
            }).then(({ data }) => {
                commit("setSingleShop", data)
            })
        },
        // show({ commit, state }, payload = { page: 1, row: 5 }) {
        //     let type = state.input.type;
        //     let text = state.input.text
        //     axios({
        //         method: "get",
        //         url: "/students",
        //         params: {
        //             ...payload,
        //             type,
        //             text,
        //         }
        //     }).then((response) => {
        //         let data = response.data;
        //         commit("setStudents", data.rows);
        //         commit("Pagination", data)
        //     });
        // }
    }
}