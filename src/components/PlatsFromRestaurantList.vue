<template>
  <section id="plats_list" class="secondary">
  <v-container class="secondary">
    <v-row
      class="mb-6 flex-row"
      no-gutters
      v-if="loading == true">
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
          v-if="loading == true"
          type="image,list-item-two-line, article, actions"
        ></v-skeleton-loader>
    
      </v-col>
    
    </v-row>
    <v-row
      class="mb-6 flex-row"
      no-gutters
      >
      <Plat v-for="plat in platsFromRestaurant" :key="plat.id" :plat="plat"/>
    </v-row>
  </v-container>
  </section>

</template>

<script>
import { mapState , mapActions}from 'vuex'
import Plat from './Plat'
export default {
    data() {
      return {
        loading : true
      }

    },
    components: {
      Plat
    },
    computed: {
      ...mapState("plat",  ['platsFromRestaurant']),
  },
   mounted() {
      this.initialize()  
  },
  methods: {
      async initialize() {
        this.loading = true;
        await this.getRestaurantPlats(this.$route.params.id);
        this.loading = false;
      },
    ...mapActions("plat", ["getRestaurantPlats"])
  }
}
</script>

<style>

</style>