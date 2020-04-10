import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Restaurants from "../views/Restaurants.vue";
import AdminRestaurants from "../views/Admin/Restaurants.vue";
import Plats from "../views/Plats.vue";
import Checkout from "../views/Checkout.vue";
import ListePlat from "../views/ListePlat.vue";
import ListePlatFromRestaurant from "../views/RestaurantPage.vue";
import AdminFeedbacks from "../views/Admin/Feedbacks.vue";
import AdminCommandes from "../views/Admin/Commandes.vue";
import ListeRestaurant from "../views/RestaurantVuex.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/plats",
    name: "Plats",
    component: Plats
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout
  },
  {
    path: "/plat-liste",
    name: "ListePlat",
    component: ListePlat
  },
  {
    path: "/restaurants/:id",
    name: "ListePlatFromRestaurant",
    component: ListePlatFromRestaurant
  },
  {
    path: "/restaurant-liste",
    name: "ListeRestaurant",
    component: ListeRestaurant
  },
  {
    path: "/restaurants",
    name: "Restaurants",
    component: Restaurants
  },
  {
    path: "/admin/restaurants",
    name: "AdminRestaurants",
    component: AdminRestaurants
  },
  {
    path: "/admin/feedbacks",
    name: "AdminFeedbacks",
    component: AdminFeedbacks
  },
  {
    path: "/admin/commandes",
    name: "AdminCommandes",
    component: AdminCommandes
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["authentication/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
