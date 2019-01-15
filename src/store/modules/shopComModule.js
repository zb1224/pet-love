import axios from "axios"
export default {
    namespaced: true,
    state: {
        shopComs: [],
        shopCom: {
            comName: "",
            comKind: "",
            comComponent: "",
            comSpecifications: "",
            exclusiveSpecifications: "",
            packingSpecifications: "",
            Flavor: "",
            specialFunctions: "",
            place: [],
            dateProduction: "",
            qualityDate: "",
            supplyNumber: "",
            characteristicText: "",
            price: "",
            productBigImg: "",
            productSmallImg:[],
            shopComNum: ""
        },
        pagination: {
            curpage:1,
            eachpage:5
        },
        input: {
            type: "",
            text: ""
        },
        updateVisible: false,
        updateSupplierComVisible: false,
        suppliers: [],
        supplier: {
            comName: "",
            comKind: "",
            comComponent: "",
            comSpecifications: "",
            exclusiveSpecifications: "",
            packingSpecifications: "",
            Flavor: "",
            specialFunctions: "",
            place: [],
            dateProduction: "",
            qualityDate: "",
            supplyNumber: "",
            characteristicText: "",
            price: "",
            shopComNum: ""
        },
        usersId:"",
        shopId:"",
        trueTime:""

    },
    getters: {},
    mutations: {
        setShopComs(state, shopComs) {
            state.shopComs = shopComs;
        },
        setShopCom(state, shopCom) {
            state.shopCom = shopCom;
        },
        Pagination(state, pagination) {
            state.pagination = pagination;
        },
        setText(state, text) {
            state.input.text = text
        },
        setType(state, type) {
            state.input.type = type
        },
        setUpdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible
        },
        setComName(state, comName) {
            state.comName = comName
        },
        setComKind(state, comKind) {
            state.comKind = comKind
        },
        setComComponent(state, comComponent) {
            state.comComponent = comComponent
        },
        setComSpecifications(state, comSpecifications) {
            state.comSpecifications = comSpecifications
        },
        setExclusiveSpecifications(state, exclusiveSpecifications) {
            state.exclusiveSpecifications = exclusiveSpecifications
        },
        setPackingSpecifications(state, packingSpecifications) {
            state.packingSpecifications = packingSpecifications
        },
        setFlavor(state, Flavor) {
            state.Flavor = Flavor
        },
        setSpecialFunctions(state, specialFunctions) {
            state.specialFunctions = specialFunctions
        },
        setPlace(state, place) {
            state.place = place
        },
        setDateProduction(state, dateProduction) {
            state.dateProduction = dateProduction
        },
        setQualityDate(state, qualityDate) {
            state.qualityDate = qualityDate
        },
        setSupplyNumber(state, supplyNumber) {
            state.supplyNumber = supplyNumber
        },
        setCharacteristicText(state, characteristicText) {
            state.characteristicText = characteristicText
        },
        setPrice(state, price) {
            state.price = price
        },
        setProductBigImg(state, productBigImg) {
            state.productBigImg = productBigImg
        },
        setProductSmallImg(state, productSmallImg) {
            state.productSmallImg = productSmallImg
        },
        setShopComNum(state, shopComNum) {
            state.shopComNum = shopComNum
        },
        setSupName(state, comName) {
            state.comName = comName
        },
        setSuppliers(state, suppliers) {
            state.suppliers = suppliers;
        },
        setSupplier(state, supplier) {
            state.supplier = supplier;
        },
        setUpdateSupplierComVisible(state, updateSupplierComVisible) {
            state.updateSupplierComVisible = updateSupplierComVisible
        },
        setUsersId(state,usersId){
            state.usersId = usersId
        },
        setShopId(state,shopId){
            state.shopId = shopId
        },
        setCurpage(state, curpage) {
            state.pagination.curpage = curpage
        },
        setEachpage(state, eachpage) {
            state.pagination.eachpage = eachpage
        },
        setTrueTime(state, trueTime) {
            state.trueTime = trueTime
        },


    },
    actions: {
        setShopCom({ commit }, id) {
            axios({
                method: "get",
                url: "/shopCom/" + id
            }).then(({ data }) => {
                commit("setShopCom", data)
                console.log("要修改的东西",data)
            })
        },
        // show({ commit, state }, payload = { page: 1, row: 5 }) {
        //     let type = state.input.type;
        //     let text = state.input.text
        //     axios({
        //         method: "get",
        //         url: "/shopCom",
        //         params: {
        //             ...payload,
        //             type,
        //             text,
        //             // shopId:"5c3486521fd590199c580c49",
        //             shopId:state.shopId
        //         }
        //     }).then((response) => {
        //         let data = response.data;
        //         console.log(data)
        //         commit("setShopComs", data.rows);
        //         commit("Pagination", data)
        //     });
        // },
        show({ commit, state }) {
            let type = state.input.type;
            let text = state.input.text;
            let page=state.pagination.curpage;
            let rows=state.pagination.eachpage;
            console.log(type,text,page,rows,state.shopId)
            axios({
                method: "get",
                url: "/shopCom",
                params: {
                    page,
                    rows,
                    type,
                    text,
                    // shopId:"5c3486521fd590199c580c49",
                    shopId:state.shopId
                }
            }).then((response) => {
                let data = response.data;
                console.log("hhb",data)
                commit("setShopComs", data.rows);
                commit("Pagination", data)
            });
        },
        showSupplier({ commit }) {
            axios({
                method: "get",
                url: "/shopCom",
                params: {
                    type: "findSupplierCom",
                }
            }).then((response) => {
                let data = response.data;
                commit("setSuppliers", data);
                console.log("供应商货品", data)
            });
        },
        setSupplier({ commit,dispatch,state}, data) {
            // let suppliercommodity;
            console.log("11111111", data.id)
            console.log("222222222222", data.type)
            axios({
                method: "get",
                url: "/shopCom/" + data.id,
                params: {
                    type: data.type,
                }
            }).then(({ data }) => {
                commit("setSupplier", data);
                console.log("具体商品", data)
                // suppliercommodity=data;
                axios({
                    method: "post",
                    url: "/shopCom",
                    data: {
                            ...data,
                            supplierId:data.supplier._id,
                            type: "fromSupplierCom",
                            // shopId:"5c3486521fd590199c580c49"
                            shopId:state.shopId
                    }
                }).then(({ data }) => {
                    // commit("setSupplier", data);
                    dispatch("show")
                    console.log("具体hahahahahaha商品", data)
                })
            })
        },
        getSession({ commit,state,dispatch }) {
            axios({
              method: "get",
              url: "/index/getSession"
            }).then(({ data }) => {
              commit("setUsersId", data._id);
              console.log("登录的用户信息",data)
              axios({
                method: "get",
                url:"/shop",
                params:{
                    usersId:data._id
                }
              }).then(({data})=>{
                commit("setShopId", data[0]._id);
                dispatch("show")
                console.log("电铺信息",data)
                console.log("this.state.shopId",state.shopId)
              })
            });
          },
          getTime({commit}){
            var nowtime = new Date();
            var year = nowtime.getFullYear();
            // var month = (nowtime.getMonth() + 1).toString().replace(/^[0-9]{1}$/,"0"+(nowtime.getMonth() + 1));
            var month = (nowtime.getMonth() + 1).toString().replace(/^[0-9]{1}$/,nowtime.getMonth() + 1);
            var day = (nowtime.getDate()).toString().replace(/^[0-9]{1}$/,nowtime.getDate());
            commit("setTrueTime", year+'/'+month+'/'+day);
        },
        // padleft0=(obj)=>{
        //     return (nowtime.getMonth() + 1).toString().replace(/^[0-9]{1}$/,"0"+(nowtime.getMonth() + 1))
        // }
    }
}