<template>
  <div>
    <h1>Tous les plats de votre resto</h1>
    <plat-list />
  </div>
</template>

<script>
import PlatList from "@/components/Restaurateur/PlatsList.vue";
export default {
  components: {
    PlatList
  }
};
</script>

<style>
</style>