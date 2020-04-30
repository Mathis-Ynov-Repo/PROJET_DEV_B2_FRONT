<template>
  <v-col cols="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img
        height="250"
        :src="plat.image ? 'http://localhost:3000/images/products/' + plat.image.filePath : 'https://cdn.vuetifyjs.com/images/cards/cooking.png' "
      ></v-img>

      <v-card-text style="position: relative" class="py-0">
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="secondary"
          @click="removeFavorite(plat)"
          v-if="$store.state.plat.favorites.find(element => element.id === plat.id)"
        >
          <v-icon color="primary">mdi-heart</v-icon>
        </v-btn>

        <v-btn absolute dark fab top right color="secondary" @click="addFavorite(plat)" v-else>
          <v-icon color="white">mdi-heart</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-title>{{plat.libelle}}</v-card-title>

      <v-card-text v-if="plat.description != null">{{plat.description}}</v-card-text>
      <v-card-text v-else>No description available for this product</v-card-text>
      <!-- <v-card-subtitle>{{plat.description}}</v-card-subtitle> -->
      <v-card-title class="grey--text py-0">{{plat.prix}} $ • {{plat.platType.libelle}}</v-card-title>
      <v-card-actions class="justify-center">
        <PlatDetail :plat="plat" />
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import PlatDetail from "./PlatDetail";
import { mapActions } from "vuex";

export default {
  components: {
    PlatDetail
  },
  props: ["plat"],

  methods: {
    ...mapActions("plat", ["addFavorite"]),
    ...mapActions("plat", ["removeFavorite"])
  }
};
</script>

<style>
</style>