<template>
  <section id="admin_plats_list" class="secondary">
    <v-container class="secondary">
      <h2 class="font-weight-light">
        Favorite Dishes
        <v-icon>mdi-heart</v-icon>
      </h2>

      <v-row class="mb-6 flex-row" no-gutters>
        <Plat v-for="plat in user.plats" :key="plat.id" :plat="plat" />
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Plat from "./UserDish";
export default {
  props: ["user"],
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