<template>
  <div>
    <!-- <restaurant-infoV2 :restaurant="restaurant"></restaurant-infoV2> -->
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
    <restaurant-info :restaurant="restaurant"></restaurant-info>
    <v-container>
      <v-row>
        <v-col class="text-center" cols="6" md="3" lg="2" xl="1">
          <v-btn @click="view = 0" dark color="blue" v-if="plats.length">All</v-btn>
        </v-col>
        <v-col class="text-center" cols="6" md="3" lg="2" xl="1">
          <v-btn @click="view = 1" dark color="pink" v-if="plats.length">Desserts</v-btn>
        </v-col>
        <v-col class="text-center" cols="6" md="3" lg="2" xl="1">
          <v-btn @click="view = 2" color="orange" dark v-if="plats.length">Dishes</v-btn>
        </v-col>
        <v-col class="text-center" cols="6" md="3" lg="2" xl="1">
          <v-btn @click="view = 3" color="black" dark v-if="plats.length">Drinks</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="view == 0">
      <plat-list :plats="plats" />
    </v-container>

    <dishes-list :plats="plats" v-if="view == 2" />

    <dessert-list :plats="plats" v-if="view == 1" />

    <boisson-list :plats="plats" v-if="view == 3" />
  </div>
</template>

<script>
import PlatList from "../components/PlatsFromRestaurantList";
import DishesList from "../components/DishesFromRestaurantList";
import DessertList from "../components/DessertFromRestaurantList";
import BoissonList from "../components/BoissonFromRestaurantList";
import RestaurantInfo from "../components/RestaurantInfo.vue";

export default {
  data() {
    return {
      view: 0,
      restaurant: {},
      plats: {},
      loading: true
    };
  },
  components: {
    PlatList,
    RestaurantInfo,
    DessertList,
    DishesList,
    BoissonList
    // RestaurantInfoV2
  },
  async mounted() {
    this.loading = true;
    await this.getRestaurantWithId(this.$route.params.id);
    this.loading = false;
    this.getPlatsWithRestaurantId(this.$route.params.id);
  },

  methods: {
    async getRestaurantWithId(id) {
      await this.$http
        .get("http://localhost:3000/api/restaurants/" + id)
        .then(response => {
          this.restaurant = response.data;
        });
    },
    getPlatsWithRestaurantId(id) {
      this.$http
        .get("http://localhost:3000/api/plats?restaurant.id=" + id)
        .then(response => {
          this.plats = response.data["hydra:member"];
        });
    }
  }
};
</script>

<style>
</style>