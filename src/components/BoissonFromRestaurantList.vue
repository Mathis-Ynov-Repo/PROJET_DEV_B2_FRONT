<template>
  <v-container id="boissons_list" class="secondary my-5">
    <h1>Drinks</h1>
    <v-row class="mb-6 flex-row" no-gutters>
      <Plat v-for="boisson in boissons" :key="boisson.id" :plat="boisson" />
    </v-row>
    <h2 v-if="boissons.length == 0">No Drinks available in this restaurant</h2>
  </v-container>
</template>

<script>
import Plat from "./Plat";
export default {
  props: ["plats"],
  computed: {
    boissons() {
      return this.plats.filter(function(plat) {
        return plat.platType.libelle.match("Boisson");
      });
    }
  },
  data() {
    return {
      loading: true
    };
  },

  components: {
    Plat
  }
};
</script>

<style>
</style>