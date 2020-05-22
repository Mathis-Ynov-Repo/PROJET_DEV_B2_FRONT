import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AdminRestaurants from "../views/Admin/Restaurants.vue";

import Checkout from "../views/Checkout.vue";
import ListePlat from "../views/ListePlat.vue";
import ListePlatFromRestaurant from "../views/RestaurantPage.vue";
import RestaurateurRestaurant from "../views/Restaurateur/Restaurant.vue";
import AdminFeedbacks from "../views/Admin/Feedbacks.vue";
import AdminCommandes from "../views/Admin/Commandes.vue";
import AdminDashboard from "../views/Admin/Dashboard.vue";
import AdminRestaurantPage from "../views/Admin/RestaurantPage.vue";
import AdminUsers from "../views/Admin/Users.vue";
import AdminUserPage from "../views/Admin/UserPage.vue";

import ListeRestaurant from "../views/RestaurantVuex.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import Favorites from "../views/Favorites.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
    meta: {
      requiresAuth: true,
      is_user: true,
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
      is_user: true,
    },
  },
  {
    path: "/plat-liste",
    name: "ListePlat",
    component: ListePlat,
    meta: {
      requiresAuth: true,
      is_user: true,
    },
  },
  {
    path: "/restaurants/:id",
    name: "ListePlatFromRestaurant",
    component: ListePlatFromRestaurant,
    meta: {
      requiresAuth: true,
      is_user: true,
    },
  },
  {
    path: "/restaurant-liste",
    name: "ListeRestaurant",
    component: ListeRestaurant,
    meta: {
      requiresAuth: true,
      is_user: true,
    },
  },
  {
    path: "/restaurateur/restaurant",
    name: "RestaurateurRestaurant",
    component: RestaurateurRestaurant,
    meta: {
      requiresAuth: true,
      is_restaurateur: true,
    },
  },
  {
    path: "/admin/restaurants",
    name: "AdminRestaurants",
    component: AdminRestaurants,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
  {
    path: "/admin/restaurants/:id",
    name: "AdminRestaurantPage",
    component: AdminRestaurantPage,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: AdminUsers,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
  {
    path: "/admin/users/:id",
    name: "AdminUserPage",
    component: AdminUserPage,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
  {
    path: "/admin/feedbacks",
    name: "AdminFeedbacks",
    component: AdminFeedbacks,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
  {
    path: "/admin/commandes",
    name: "AdminCommandes",
    component: AdminCommandes,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["authentication/isLoggedIn"]) {
      let user = store.getters["authentication/authUser"];
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user.roles.includes("ROLE_ADMIN")) {
          next();
        } else {
          next({ name: "Login" });
        }
      } else if (to.matched.some((record) => record.meta.is_restaurateur)) {
        if (user.roles.includes("ROLE_RESTAURATEUR")) {
          next();
        } else {
          next({ name: "Login" });
        }
      } else if (to.matched.some((record) => record.meta.is_user)) {
        if (user.roles.length === 1 && user.roles.includes("ROLE_USER")) {
          next();
        } else {
          next({ name: "Login" });
        }
      } else {
        next();
      }
      next();
      return;
    }
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
