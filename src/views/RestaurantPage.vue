<template>
  <div>
    <restaurant-info :restaurant="restaurant"></restaurant-info>
    <h1>Tous les plats du resto</h1>
    <plat-list :plats="restaurant.plats" />
  </div>
</template>

<script>
import PlatList from "../components/PlatsFromRestaurantList";
import RestaurantInfo from "../components/RestaurantInfo.vue";
export default {
  data() {
    return {
      restaurant: {}
    };
  },
  components: {
    PlatList,
    RestaurantInfo
  },
  mounted() {
    this.getRestaurantWithId(this.$route.params.id);
  },
  methods: {
    getRestaurantWithId(id) {
      this.$http
        .get("http://localhost:3000/api/restaurants/" + id)
        .then(response => {
          this.restaurant = response.data;
        });
    }
  }
};
</script>

<style>
</style>