<template>
  <div>
    <h1>Your Favorites</h1>
    <favorites-items-list></favorites-items-list>
  </div>
</template>

<script>
import FavoritesItemsList from "../components/FavoritesItemsList.vue";
export default {
  components: {
    FavoritesItemsList
  }
};
</script>

<style>
</style>