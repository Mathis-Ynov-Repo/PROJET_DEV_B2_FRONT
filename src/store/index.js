import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

import plat from "./modules/plat";
import menu from "./modules/menu";
import cart from "./modules/cart";
import restaurant from "./modules/restaurant";
import order from "./modules/order";
import notifications from "./modules/notifications";
import authentication from "./modules/authentication";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  modules: {
    plat,
    cart,
    menu,
    restaurant,
    order,
    notifications,
    authentication,
  },
});
