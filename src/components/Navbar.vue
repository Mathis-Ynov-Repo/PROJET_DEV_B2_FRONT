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

      <Searchbar
        v-if="$store.getters['authentication/isLoggedIn'] && !$store.getters['authentication/isRestaurateur']"
      ></Searchbar>

      <v-spacer></v-spacer>
      <div class="auth-container" v-if="!$store.getters['authentication/isLoggedIn']">
        <v-btn text color="primary" :to="{name:'Login'}">
          <span>Connexion</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        <v-btn color="primary" :to="{name:'Register'}">
          <span>Inscription</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
      <v-menu
        transition="slide-y-transition"
        offset-y
        bottom
        v-if="$store.getters['authentication/isLoggedIn']"
      >
        <template v-slot:activator="{ on }">
          <v-avatar dark v-on="on" style="cursor: pointer" size="48" color="indigo">
            <img
              v-if="$store.state.authentication.user.image"
              :src="'http://localhost:3000/images/products/'+$store.state.authentication.user.image"
              alt="TST"
            />
            <v-icon dark v-else>mdi-account</v-icon>
          </v-avatar>
        </template>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item color="secondary" router :to="{name:'Profile'}">
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item
              router
              :to="{name:'Favorites'}"
              v-if="this.$store.getters['authentication/authUser'].roles.includes('ROLE_USER') && this.$store.getters['authentication/authUser'].roles.length === 1"
            >
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Favorites</v-list-item-title>
            </v-list-item>
            <v-list-item @click.prevent="logout()" router :exact="true" :to="{name:'Login'}">
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <div
        class="mx-5"
        v-if="$route.name != 'Checkout' && $store.getters['authentication/isLoggedIn'] && !$store.getters['authentication/isRestaurateur'] && !$store.getters['authentication/isAdmin']"
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
      <v-list>
        <v-list-item :exact="true" router :to="{name:'Home'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
      <v-list
        v-if="this.$store.getters['authentication/authUser'].roles.includes('ROLE_RESTAURATEUR')"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="white--text">Accès Restaurateur</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="link in RestaurateurLinks"
          :key="link.route"
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
      </v-list>
      <v-list
        v-if="this.$store.getters['authentication/authUser'].roles.includes('ROLE_USER') && this.$store.getters['authentication/authUser'].roles.length === 1"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="white--text">Accès Utilisateur</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="link in links"
          :key="link.route"
          :exact="true"
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
      </v-list>
      <v-list>
        <v-list-item @click.prevent="logout()" router :exact="true" :to="{name:'Login'}">
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
import Searchbar from "./Searchbar";
export default {
  components: { PopupCart, Searchbar },
  data() {
    return {
      drawer: false,

      links: [
        { icon: "mdi-home-variant", text: "ListePlats", route: "ListePlat" },
        {
          icon: "mdi-home-variant",
          text: "ListeRestaurants",
          route: "ListeRestaurant"
        }
      ],
      RestaurateurLinks: [
        {
          icon: "mdi-home-variant",
          text: "Mon Restaurant",
          route: "RestaurateurRestaurant"
        }
      ],
      AdminLinks: [
        {
          icon: "mdi-home-variant",
          text: "AdminDashboard",
          route: "AdminDashboard"
        },
        {
          icon: "mdi-home-variant",
          text: "AdminRestaurants",
          route: "AdminRestaurants"
        },
        {
          icon: "mdi-account",
          text: "Utilisateurs",
          route: "AdminUsers"
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
  // async created() {
  //   this.unwatch = this.$store.watch(
  //     (state, getters) => getters["authentication/isLoggedIn"],
  //     (newValue, oldValue) => {
  //       console.log(`Updating from ${oldValue} to ${newValue}`);

  //       // Do whatever makes sense now
  //       if (newValue === true) {
  //         this.initialize();
  //       }
  //     }
  //   );
  // },
  methods: {
    ...mapActions("authentication", ["logout"])
  }
};
</script>

<style>
</style>