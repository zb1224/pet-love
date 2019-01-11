import axios from "axios"

export default {
    namespaced: true,
    state: {
        users: [],
        user: {},
        updataVisible: false,
        userInput: {
            type: "",
            text: "",
        },
        usersPagination: {
            curpage: 1,
            eachpage: 5
        },
        addUser: {},
        updataUser: {},
    },
    getters: {

    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setUsers(state, users) {
            state.users = users
        },
        setPagination(state, usersPagination) {
            state.usersPagination = usersPagination
        },
        setVisible(state, updataVisible) {
            state.updataVisible = updataVisible
        },
        setUserType(state, type) {
            state.userInput = {
                ...state.userInput, type
            }
        },
        setUserText(state, text) {
            state.userInput = {
                ...state.userInput, text
            }
        },
        setUserPage(state, page) {
            state.usersPagination.curpage = page
        },
        setUserRows(state, rows) {
            state.usersPagination.eachpage = rows
        },
    },
    actions: {
        updataUserInfo({ commit }, id) {
            axios({
                method: "get",
                url: "/users/" + id
            }).then(({ data }) => {
                console.log(data)
                commit("setUser", data)
            });
        },
        showUsers({ state, commit }) {
            let page = state.usersPagination.curpage
            let rows = state.usersPagination.eachpage
            let type = state.userInput.type
            let text = state.userInput.text
            console.log(type,text)
            axios({
                method: "get",
                url: "/users",
                params: {
                    page,
                    rows,
                    type: type || "status",
                    text: text || "1"
                }
            }).then(({ data }) => {
                console.log("111", data)
                commit("setUsers", data.rows)
                commit("setPagination", data)
            });
        },
    }
}