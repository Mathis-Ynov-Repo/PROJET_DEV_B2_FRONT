<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="primary"
          v-if="loading === true"
        ></v-progress-circular>
      </v-row>
    </v-container>
    <restaurant-info :restaurant="restaurant" v-if="loading === false"></restaurant-info>
    <v-container>
      <v-row v-if="!plats.length && loadingDishes == true">
        <v-col cols="6" md="2" lg="2" xl="2" v-for="n in 2" :key="'array-1-' + n">
          <v-skeleton-loader max-width="374" class="d-flex justify-center" type="button"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" lg="4" xl="4">
          <v-skeleton-loader class="d-flex justify-center" type="button"></v-skeleton-loader>
        </v-col>
        <v-col cols="6" md="2" lg="2" xl="2" v-for="y in 2" :key="'array-2-' +y">
          <v-skeleton-loader max-width="374" class="d-flex justify-center" type="button"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center" cols="6" md="2" lg="2" xl="2">
          <v-btn @click="view = 0" dark color="blue" v-if="plats.length">Everything</v-btn>
        </v-col>
        <v-col class="text-center" cols="6" md="2" lg="2" xl="2">
          <v-btn @click="view = 1" dark color="pink" v-if="plats.length">Desserts</v-btn>
        </v-col>
        <v-col class="text-center" cols="12" md="4" lg="4" xl="4">
          <v-btn @click="view = 4" color="purple" dark v-if="plats.length">Restaurant Menus</v-btn>
        </v-col>
        <v-col class="text-center" cols="6" md="2" lg="2" xl="2">
          <v-btn @click="view = 2" color="orange" dark v-if="plats.length">Dishes</v-btn>
        </v-col>
        <v-col class="text-center" cols="6" md="2" lg="2" xl="2">
          <v-btn @click="view = 3" color="black" dark v-if="plats.length">Drinks</v-btn>
        </v-col>
      </v-row>
      <h2
        v-if="!plats.length && loadingDishes == false"
        class="font-weight-thin"
      >This restaurant has yet to add any dish</h2>
    </v-container>

    <plats-list v-if="view == 0" :plats="plats" />

    <dishes-list :plats="plats" v-if="view == 2" />

    <desserts-list :plats="plats" v-if="view == 1" />

    <boissons-list :plats="plats" v-if="view == 3" />

    <menus-list :menus="menus" v-if="view == 4" />
  </div>
</template>

<script>
import PlatsList from "../components/PlatsFromRestaurantList";
import DishesList from "../components/DishesFromRestaurantList";
import DessertsList from "../components/DessertFromRestaurantList";
import BoissonsList from "../components/BoissonFromRestaurantList";
import MenusList from "../components/MenusFromRestaurantList";
import RestaurantInfo from "../components/RestaurantInfo.vue";

export default {
  data() {
    return {
      view: 0,
      restaurant: {},
      menus: {},
      plats: {},
      loading: true,
      loadingDishes: true,
      loadingMenus: true
    };
  },
  components: {
    PlatsList,
    RestaurantInfo,
    DessertsList,
    MenusList,
    DishesList,
    BoissonsList
    // RestaurantInfoV2
  },
  async mounted() {
    this.loading = true;
    this.loadingDishes = true;
    this.loadingMenus = true;
    await this.getRestaurantWithId(this.$route.params.id);
    this.loading = false;
    await this.getPlatsWithRestaurantId(this.$route.params.id);
    this.loadingDishes = false;
    await this.getMenusWithRestaurantId(this.$route.params.id);
    this.loadingMenus = false;
  },

  methods: {
    async getRestaurantWithId(id) {
      await this.$http
        .get("http://localhost:3000/api/restaurants/" + id)
        .then(response => {
          this.restaurant = response.data;
        });
    },
    async getPlatsWithRestaurantId(id) {
      await this.$http
        .get("http://localhost:3000/api/plats?restaurant.id=" + id)
        .then(response => {
          this.plats = response.data["hydra:member"];
        });
    },
    async getMenusWithRestaurantId(id) {
      await this.$http
        .get("http://localhost:3000/api/menus?restaurant=" + id)
        .then(response => {
          this.menus = response.data["hydra:member"];
        });
    }
  }
};
</script>

<style>
</style>