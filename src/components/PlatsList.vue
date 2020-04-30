<template>
  <section id="plats_list" class="secondary">
    <v-container class="secondary">
      <v-row class="mb-6 flex-row" no-gutters v-if="plats.length == 0">
        <v-col cols="12" md="6" lg="4" xl="3" v-for="n in 8" :key="n">
          <v-skeleton-loader
            class="mx-auto my-12"
            max-width="374"
            v-if="plats.length == 0"
            type="image, card-heading, list-item-two-line, list-item, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mb-6 flex-row" no-gutters>
        <Plat v-for="plat in plats" :key="plat.id" :plat="plat" />
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Plat from "./Plat";
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
    ...mapState("plat", ["plats"])
  },
  mounted() {
    this.getPlats();
  },
  methods: {
    ...mapActions("plat", ["getPlats"])
  }
};
</script>

<style>
</style>