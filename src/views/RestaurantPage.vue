<template>
    <div>
      <h1>Tous les plats du resto</h1>
      <plat-list />
  </div>
</template>

<script>
import PlatList from '../components/PlatsFromRestaurantList';
export default {
    components: {
        PlatList
    }
}
</script>

<style>

</style>