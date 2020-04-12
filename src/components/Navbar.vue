<template>
  <nav>
    <v-app-bar text app color="grey lighten-4">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="$store.getters['authentication/isLoggedIn']"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="d-none d-sm-flex">
        <v-img src="/images/logo.jpg" width="90"></v-img>
      </v-toolbar-title>

      <v-autocomplete
        v-if="$store.getters['authentication/isLoggedIn']"
        v-model="select"
        :loading="loading"
        :items="restaurants"
        item-text="libelle"
        item-value="id"
        :search-input.sync="search"
        cache-items
        class="mx-4 d-none d-sm-flex"
        flat
        hide-no-data
        hide-details
        label="Rechercher un restaurant ?"
        solo-inverted
        @change="goToRestaurantPage"
      ></v-autocomplete>
      <v-spacer></v-spacer>
      <div class="auth-container" v-if="!$store.getters['authentication/isLoggedIn']">
        <v-btn text color="primary" to="Login">
          <span>Connexion</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        <v-btn color="primary" to="Register">
          <span>Inscription</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
      <div
        class="mx-5"
        v-if="$route.name != 'Checkout' && $store.getters['authentication/isLoggedIn']"
      >
        <v-badge left color="green">
          <PopupCart />
          <span slot="badge">{{cartItemCount}}</span>
        </v-badge>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      class="accent"
      v-if="$store.getters['authentication/isLoggedIn']"
    >
      <v-list v-if="this.$store.getters['authentication/authUser'].roles.includes('ROLE_ADMIN')">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="white--text">Accès Administrateur</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="link in AdminLinks" :key="link.route" router :to="{name:link.route}">
          <v-list-item-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="white--text">Accès Utilisateur</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="link in links"
          :key="link.route"
          exact="true"
          router
          :to="{name:link.route}"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.prevent="logout()">
          <v-list-item-action>
            <v-icon class="white--text">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">Se déconnecter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PopupCart from "./PopupCart";
import Axios from "axios";
export default {
  components: { PopupCart },
  data() {
    return {
      drawer: false,
      search: null,
      select: null,
      loading: true,
      restaurants: [],
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "Home" },
        { icon: "mdi-food-fork-drink", text: "Plats", route: "Plats" },
        {
          icon: "mdi-home-variant",
          text: "Restaurants",
          route: "Restaurants"
        },
        { icon: "mdi-home-variant", text: "ListePlats", route: "ListePlat" },
        {
          icon: "mdi-home-variant",
          text: "ListeRestaurants",
          route: "ListeRestaurant"
        },
        { icon: "mdi-home-variant", text: "Profil", route: "Profile" }
      ],
      AdminLinks: [
        {
          icon: "mdi-home-variant",
          text: "AdminRestaurants",
          route: "AdminRestaurants"
        },

        {
          icon: "mdi-home-variant",
          text: "AdminCommandes",
          route: "AdminCommandes"
        },
        {
          icon: "mdi-home-variant",
          text: "AdminFeedbacks",
          route: "AdminFeedbacks"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItemCount"])
  },
  async created() {
    this.initialize();
  },
  methods: {
    ...mapActions("authentication", ["logout"]),
    async initialize() {
      this.loading = true;
      await this.getRestaurants();
      this.loading = false;
    },
    async getRestaurants() {
      await Axios.get("http://localhost:3000/api/restaurants").then(
        response => (this.restaurants = response.data["hydra:member"])
      );
    },
    goToRestaurantPage() {
      window.location.href = "/restaurants/" + this.select;
    }
  }
};
</script>

<style>
</style>