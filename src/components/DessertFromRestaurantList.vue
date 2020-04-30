<template>
  <v-container id="desserts_list" class="secondary my-5">
    <h1>Desserts</h1>
    <v-row class="mb-6 flex-row" no-gutters>
      <Plat v-for="dessert in desserts" :key="dessert.id" :plat="dessert" />
    </v-row>
    <h2 v-if="desserts.length == 0">No deserts</h2>
  </v-container>
</template>

<script>
import Plat from "./Plat";
export default {
  props: ["plats"],
  computed: {
    desserts() {
      return this.plats.filter(function(plat) {
        return plat.platType.libelle.match("Dessert");
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