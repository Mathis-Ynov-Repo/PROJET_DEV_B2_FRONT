<template>
  <v-autocomplete
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
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      search: null,
      restaurants: [],
      select: null,
      loading: true
    };
  },
  async created() {
    this.initialize();
  },
  methods: {
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