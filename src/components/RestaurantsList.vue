<template>
  <div>
    <section class="container-fluid d-flex flex-row filter-sort-container">
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            :items="types"
            label="Fancy a specific restaurant type ?"
            :loading="loading ? true : false"
            item-text="type"
            item-value="type"
            @change="this.getRestaurantsFromType"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="6" lg="2" class="text-lg-right">
              <v-btn small text color="grey" @click="sortByRating()">
                <v-icon left small>mdi-star</v-icon>
                <span class="caption text-lowercase">By rating</span>
              </v-btn>
            </v-col>

            <v-col cols="6" lg="2">
              <v-btn small text color="grey" @click="sortByTitle()">
                <v-icon left small>mdi-format-title</v-icon>
                <span class="caption text-lowercase">By title</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>
    <section id="restaurants_list" class="secondary">
      <v-container class="secondary">
        <v-row class="mb-6 flex-row" no-gutters v-if="restaurants.length == 0 ||loading == true">
          <v-col cols="12" md="6" lg="4" xl="3" v-for="n in 8" :key="n">
            <v-skeleton-loader
              class="mx-auto my-12"
              max-width="374"
              v-if="restaurants.length == 0 ||loading == true"
              type="image,list-item-two-line, article, actions"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row class="mb-6 flex-row" no-gutters>
          <Restaurant
            v-for="restaurant in filteredData"
            :key="restaurant.id"
            :restaurant="restaurant"
          />
        </v-row>
      </v-container>
    </section>
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
      types: [],
      filteredData: []
    };
  },
  components: {
    Restaurant
  },
  computed: {
    ...mapState("restaurant", ["restaurants"])
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      await this.getRestaurants();
      this.filteredData = this.restaurants;
      await this.getRestaurantsTypes();
      this.loading = false;
    },
    ...mapActions({
      getRestaurants: "restaurant/getRestaurants",
      getRestaurantsWithType: "restaurant/getRestaurantsWithType",
      clearRestaurants: "restaurant/clearRestaurants"
    }),
    async getRestaurantsFromType(type) {
      await this.getRestaurantsWithType(type);
      this.filteredData = this.restaurants;
    },
    async getRestaurantsTypes() {
      await this.$http
        .get("http://localhost:3000/api/restaurant_types")
        .then(response => (this.types = response.data["hydra:member"]));
    },
    sortByRating() {
      this.filteredData.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    },
    sortByTitle() {
      this.filteredData.sort((a, b) =>
        a.libelle.charAt(0).toUpperCase() < b.libelle.charAt(0).toUpperCase()
          ? -1
          : 1
      );
    }
  }
};
</script>

<style>
</style>