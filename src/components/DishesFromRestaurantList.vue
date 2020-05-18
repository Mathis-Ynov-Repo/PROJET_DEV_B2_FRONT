<template>
  <v-container id="dishes_list" class="secondary my-5">
    <h1>Dishes</h1>
    <v-row class="mb-6 flex-row" no-gutters>
      <Plat v-for="dish in dishes" :key="dish.id" :plat="dish" />
    </v-row>
    <h2 v-if="dishes.length == 0">No dishes available in this restaurant</h2>
  </v-container>
</template>

<script>
import Plat from "./Plat";
export default {
  props: ["plats"],
  computed: {
    dishes() {
      return this.plats.filter(function(plat) {
        return plat.platType.libelle.match("Plat");
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