import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

import plat from "./modules/plat"
import cart from "./modules/cart"
import restaurant from "./modules/restaurant"
import order from "./modules/order"
import notifications from "./modules/notifications"

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,

    modules: {
        plat,
        cart,
        restaurant,
        order,
        notifications
    }

});