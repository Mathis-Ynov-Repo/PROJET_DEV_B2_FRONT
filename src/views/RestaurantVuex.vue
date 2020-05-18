<template>
  <div>
    <h1>Every restaurant on our site</h1>
    <restaurant-list />
  </div>
</template>

<script>
import RestaurantList from "../components/RestaurantsList.vue";
export default {
  components: {
    RestaurantList
  }
};
</script>

<style>
</style>
