<template>
  <v-col cols="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

      <v-card-title>{{plat.libelle}}</v-card-title>
      <!-- <v-card-subtitle>{{plat.restaurant.libelle}}</v-card-subtitle> -->
      <v-card-title class="grey--text py-0">{{plat.prix}} $ • {{plat.platType.libelle}}</v-card-title>
      <!-- <v-card-actions class="justify-center">
        <PlatDetail :plat="plat" />
      </v-card-actions>-->
    </v-card>
  </v-col>
</template>

<script>
// import PlatDetail from "./PlatDetail";
// import { mapActions } from 'vuex'
export default {
  //   components: {
  //     PlatDetail
  //   },
  props: ["plat"]
};
</script>

<style>
</style>