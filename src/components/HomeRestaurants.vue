<template>
  <div>
    <h1 class="text-center font-weight-thin my-5">Nos Propositions</h1>
    <v-container class="secondary">
      <v-row class="mb-6 flex-row" no-gutters v-if="restaurants.length == 0">
        <v-col cols="12" md="6" lg="4" xl="3" v-for="n in 4" :key="n">
          <v-skeleton-loader
            class="mx-auto my-12"
            max-width="374"
            v-if="restaurants.length == 0"
            type="image,list-item-two-line, article, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mb-6 flex-row" no-gutters>
        <Restaurant v-for="restaurant in first4" :key="restaurant.id" :restaurant="restaurant" />
      </v-row>
    </v-container>
    <v-card-text class="white" style="height: 50px; position: relative">
      <v-btn color="pink" dark absolute top right fab :to="{name:'ListeRestaurant'}">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-text>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Restaurant from "./Restaurant";
export default {
  data() {
    return {
      loading: true,
      loadingTypes: true,
      types: []
      //filteredData: []
    };
  },
  components: {
    Restaurant
  },
  computed: {
    ...mapState("restaurant", ["restaurants"]),
    first4() {
      return this.restaurants.slice(0, 4);
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      await this.getRestaurants();
    },
    ...mapActions({
      getRestaurants: "restaurant/getRestaurants"
    })
  }
};
</script>

<style>
</style>