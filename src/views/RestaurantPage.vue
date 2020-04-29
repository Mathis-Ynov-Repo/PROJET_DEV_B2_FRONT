<template>
  <div>
    <!-- <restaurant-infoV2 :restaurant="restaurant"></restaurant-infoV2> -->
    <restaurant-info :restaurant="restaurant"></restaurant-info>
    <h1>Tous les plats du resto</h1>
    <plat-list :plats="plats" />
  </div>
</template>

<script>
import PlatList from "../components/PlatsFromRestaurantList";
import RestaurantInfo from "../components/RestaurantInfo.vue";
// import RestaurantInfoOld from "../components/RestaurantInfoOld.vue";
export default {
  data() {
    return {
      restaurant: {},
      plats: {}
    };
  },
  components: {
    PlatList,
    RestaurantInfo
    // RestaurantInfoV2
  },
  mounted() {
    this.getRestaurantWithId(this.$route.params.id);
    this.getPlatsWithRestaurantId(this.$route.params.id);
  },
  methods: {
    getRestaurantWithId(id) {
      this.$http
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