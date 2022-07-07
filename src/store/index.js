import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth/store";
import transaction from './modules/transaction/store'
import map from './modules/map/store'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        transaction,
        map
    }
})