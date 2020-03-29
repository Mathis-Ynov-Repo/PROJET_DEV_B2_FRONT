<template>
  <section id="plats_list" class="secondary">
  <v-container class="secondary">
    <!-- <v-row
      class="mb-6 flex-row"
      no-gutters
      v-if="loading">
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="3"
        v-for="n in 8"
        :key="n">
        <v-skeleton-loader
          class="mx-auto my-12"
          max-width="374"
          v-if="loading"
          type="image,list-item-two-line, article, actions"
        ></v-skeleton-loader>
    
      </v-col>
    
    </v-row> -->
    <v-row
      class="mb-6 flex-row"
      no-gutters
      >
      <Plat v-for="plat in plats" :key="plat.id" :plat="plat"/>
    </v-row>
  </v-container>
  </section>

</template>

<script>
import Plat from './Plat'
export default {
    // data() {
    //     loading : true
    // },
    components: {
        Plat
    },
    computed: {
      plats() {
          return this.$store.state.plats;
      }
  },
  mounted() {
    //   this.loading = false;
      this.$store.dispatch("getPlats");
  }
}
</script>

<style>

</style>