<template>
  <section id="plats_list" class="secondary">
    <v-container class="secondary">
      <v-row class="mb-6 flex-row" no-gutters v-if="loading == true && favorites.length === 0">
        <v-col cols="12" md="6" lg="4" xl="3" v-for="n in 4" :key="n">
          <v-skeleton-loader
            class="mx-auto my-12"
            max-width="374"
            v-if="loading == true && favorites.length === 0"
            type="image,list-item-two-line, article, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mb-6 flex-row" no-gutters>
        <Plat v-for="plat in favorites" :key="plat.id" :plat="plat" />
        <h1 v-if="loading == false && favorites.length === 0">You have yet to add any favorites</h1>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Plat from "./FavoriteDish";
export default {
  data() {
    return {
      loading: true
    };
  },
  components: {
    Plat
  },
  computed: {
    ...mapState("plat", ["favorites"])
  },
  async mounted() {
    this.loading = true;
    await this.getPlats();
    this.loading = false;
  },
  methods: {
    ...mapActions("plat", ["getPlats"])
  }
};
</script>

<style>
</style>