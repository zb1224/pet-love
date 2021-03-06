import axios from 'axios';

export default {
    namespaced: true,
    state: {
        orders: [],
        order: {
            orderContent:"",
            orderStatus:""
        },
        shopID: "5c32f25a3f79bff8f77b2f69",
        input: {
            type: "",
            value: ""
        },
        pagination: {
            curpage: 1,
            eachpage: 5
        },
        updateVisible: false,
        inquireVisible: false,
    },
    mutations: {
        // 设置所有的订单
        setOrders(state, orders) {
            state.orders = orders;
        },
        // 分页信息
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        // 更新的按钮打开值
        setUpdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible;
        },
        // 查询的按钮打开值
        setInquireVisible(state, inquireVisible) {
            state.inquireVisible = inquireVisible;
        },
        // 当前的一个表单的信息
        setOrder(state, order) {
            state.order = order;
        }
    },
    actions: {
        // 获取所有表单
        show({
            state,
            commit
        }) {
            let type = state.input.type;
            let value = state.input.value;
            let page = state.pagination.curpage;
            let rows = state.pagination.eachpage;
            let shopID = state.shopID;
            // console.log(type, value, page, rows);
            axios({
                method: "get",
                url: "/orders",
                params: {
                    page,
                    rows,
                    type,
                    value,
                    shopID,
                }
            }).then(({
                data
            }) => {
                // console.log(data);
                commit('setOrders', data.rows);
                commit('setPagination', data);
            });
        },
      updateinfo({commit},data){
        axios({
            method: "get",
            url: "/orders/"+data._id
        }).then(({data}) => {
            
            commit('setOrder', data);
            // commit('setPagination', data);
        });
      }
    }
}